import express from "express";
import SolarCalculator from "../models/SolarCalculator.js";
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
        rooftopArea,
        mobileNumber,
        propertyType,
        whatsappContact,
      } = req.body;
      console.log(req.body);
      // Calculate solar savings
      const calculatedSavings = calculateSolarSavings(
        monthlyBill,
        rooftopArea,
        state
      );

      // Save to database
      const solarCalculation = new SolarCalculator({
        state,
        monthlyBill,
        rooftopArea,
        mobileNumber,
        propertyType,
        whatsappContact,
        calculatedSavings,
      });

      await solarCalculation.save();

      res.status(201).json({
        success: true,
        message: "Solar calculation completed successfully",
        data: {
          calculationId: solarCalculation._id,
          savings: calculatedSavings,
          systemRecommendations: {
            systemSize: `${calculatedSavings.estimatedSystemSize} kW`,
            estimatedCost: `â‚¹${calculatedSavings.estimatedCost.toLocaleString()}`,
            monthlySavings: `â‚¹${calculatedSavings.monthlySavings.toLocaleString()}`,
            yearlyAnnualSavings: `â‚¹${calculatedSavings.yearlySavings.toLocaleString()}`,
            subsidyAmount: `â‚¹${calculatedSavings.subsidyAmount.toLocaleString()}`,
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
router.get(
  "/submissions",
  validateQuery(paginationSchema),
  async (req, res) => {
    try {
      const { page, limit } = req.query;
      const skip = (page - 1) * limit;

      const submissions = await SolarCalculator.find()
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-__v");

      const total = await SolarCalculator.countDocuments();

      // Calculate statistics
      const stats = await SolarCalculator.aggregate([
        {
          $group: {
            _id: null,
            totalSubmissions: { $sum: 1 },
            averageMonthlyBill: { $avg: "$monthlyBill" },
            averageSystemSize: {
              $avg: "$calculatedSavings.estimatedSystemSize",
            },
            totalPotentialSavings: { $sum: "$calculatedSavings.yearlySavings" },
          },
        },
      ]);

      res.json({
        success: true,
        data: {
          submissions,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
          statistics: stats[0] || {
            totalSubmissions: 0,
            averageMonthlyBill: 0,
            averageSystemSize: 0,
            totalPotentialSavings: 0,
          },
        },
      });
    } catch (error) {
      console.error("Get submissions error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

// Get calculation by ID
router.get("/calculation/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const calculation = await SolarCalculator.findById(id).select("-__v");

    if (!calculation) {
      return res.status(404).json({
        success: false,
        message: "Calculation not found",
      });
    }

    res.json({
      success: true,
      data: calculation,
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
