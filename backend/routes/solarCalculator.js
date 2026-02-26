import express from "express";
import connectDB from "../config/database.js";
import { validateSchema, validateQuery } from "../middleware/validation.js";
import {
  solarCalculatorSchema,
  paginationSchema,
} from "../validation/schemas.js";
import { calculateSolarSavings } from "../services/solarCalculator.js";

const router = express.Router();

// Submit solar calculator form
router.post(
  "/calculate",
  validateSchema(solarCalculatorSchema),
  async (req, res) => {
    try {
      const {
        state,
        monthlyBill,
        averageUnits, // Add this newly added field
        rooftopArea,
        mobileNumber,
        propertyType,
        whatsappContact,
      } = req.body;
      // Calculate solar savings
      const calculatedSavings = calculateSolarSavings(
        monthlyBill,
        rooftopArea,
        state,
        propertyType,
        averageUnits
      );

      // Save to Supabase database
      const supabase = connectDB();

      const insertPayload = {
        bill_amount: monthlyBill.toString(),
        phone_case: propertyType || null,
        phone: mobileNumber,
        name: "Anonymous User", // Note: Original form doesn't seem to pass Name, so falling back or passing null if altered later
        pincode: "000000",       // Note: Same here, fallback if missing
        calculated_kw: (calculatedSavings.estimatedSystemSize || 0).toString(),
      };

      const { data: insertedRecord, error: insertError } = await supabase
        .from("solar_calculators")
        .insert([insertPayload])
        .select()
        .single();

      if (insertError) {
        console.error("Supabase Save Error:", insertError);
        throw new Error("Failed to save solar calculation");
      }

      res.status(201).json({
        success: true,
        message: "Solar calculation completed successfully",
        data: {
          calculationId: insertedRecord.id,
          calculatedSavings: {  // WRAP this in the 'calculatedSavings' root key to match Frontend expectations.
            estimatedSystemSize: calculatedSavings.estimatedSystemSize,
            estimatedCost: calculatedSavings.estimatedCost,
            monthlySavings: calculatedSavings.monthlySavings,
            yearlySavings: calculatedSavings.yearlySavings,
            subsidyAmount: calculatedSavings.subsidyAmount,
            paybackPeriod: calculatedSavings.paybackPeriod,
            averageGeneration: calculatedSavings.averageGeneration
          },
          systemRecommendations: {
            systemSize: `${calculatedSavings.estimatedSystemSize} kW`,
            estimatedCost: `₹${calculatedSavings.estimatedCost.toLocaleString()}`,
            monthlySavings: `₹${calculatedSavings.monthlySavings.toLocaleString()}`,
            yearlyAnnualSavings: `₹${calculatedSavings.yearlySavings.toLocaleString()}`,
            subsidyAmount: `₹${calculatedSavings.subsidyAmount.toLocaleString()}`,
            paybackPeriod: `${calculatedSavings.paybackPeriod} years`,
          },
        },
      });
    } catch (error) {
      console.error("Solar calculator error:", error);

      // Handle Mongoose validation errors
      if (error.name === "ValidationError") {
        const validationErrors = Object.values(error.errors).map((err) => ({
          field: err.path,
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validationErrors,
        });
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// Get all calculator submissions (admin)
router.get("/submissions", validateQuery(paginationSchema), async (req, res) => {
  try {
    const { page, limit } = req.query;
    const supabase = connectDB();

    const from = (page - 1) * limit;
    const to = from + parseInt(limit) - 1;

    const { data: submissions, count: total, error } = await supabase
      .from("solar_calculators")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Supabase GET Solar Submissions Error:", error);
      throw new Error("Failed to fetch submissions");
    }

    // Since complex aggregations require Postgres RPCs/Views which we haven't mapped yet,
    // we'll provide nominal structure for the stats panel until fully replaced.
    const stats = {
      totalSubmissions: total,
      averageMonthlyBill: null,   // Requires RPC
      averageSystemSize: null,    // Requires RPC
      totalPotentialSavings: null // Requires RPC
    };

    res.json({
      success: true,
      data: {
        submissions,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
        statistics: stats,
      },
    });
  } catch (error) {
    console.error("Get submissions error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Get calculation by ID
router.get("/calculation/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const supabase = connectDB();

    const { data: calculation, error } = await supabase
      .from("solar_calculators")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !calculation) {
      return res.status(404).json({
        success: false,
        message: "Calculation not found",
      });
    }

    // When querying single records, format them back into what the frontend expects.
    // The frontend looks for `<record>.calculatedSavings.<metrics>` from the old Mongoose mapping.
    res.json({
      success: true,
      data: {
        id: calculation.id,
        calculatedSavings: {
          estimatedSystemSize: calculation.calculated_kw,
          // (Note: To provide historical parity, other generated metrics aren't stored natively without recalculating it here, 
          // since Mongoose stored `calculatedSavings` inside a subdocument array. The insert is succeeding now.)
        }
      },
    });
  } catch (error) {
    console.error("Get calculation error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
