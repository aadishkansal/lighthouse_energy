import express from "express";
import { z } from "zod";
import connectDB from "../config/database.js";
import {
  validateSchema,
  validateQuery,
  validateParams,
} from "../middleware/validation.js";
import {
  consultationSchema,
  paginationSchema,
  leadStatusUpdateSchema,
} from "../validation/schemas.js";

const router = express.Router();

// Object ID validation schema
const objectIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
});

// Zod Schema for Pincode
const pincodeParamSchema = z.object({
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Invalid Pincode format"),
});

// --- NEW ROUTE: PINCODE LOOKUP ---
// Usage: GET /api/consultation/lookup-pincode/110001
router.get(
  "/lookup-pincode/:pincode",
  validateParams(pincodeParamSchema),
  async (req, res) => {
    try {
      const { pincode } = req.params;

      // Using the free API for Indian Pincodes
      const externalApiUrl = `https://api.postalpincode.in/pincode/${pincode}`;

      const response = await fetch(externalApiUrl);
      const data = await response.json();

      // The API returns an array. Index 0 contains the status and post office data.
      if (data && data[0].Status === "Success") {
        const postOffices = data[0].PostOffice;

        // We usually take the first entry to get the general City/District/State
        const locationData = {
          city: postOffices[0].District, // Usually maps best to 'City'
          state: postOffices[0].State,
          country: postOffices[0].Country,
          details: postOffices.map((po) => po.Name), // Optional: List of area names
        };

        return res.json({
          success: true,
          data: locationData,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Pincode not found or invalid",
        });
      }
    } catch (error) {
      console.error("Pincode lookup error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch location data",
      });
    }
  }
);

// --- SUBMIT ROUTE ---
router.post("/submit", validateSchema(consultationSchema), async (req, res) => {
  try {

    const supabase = connectDB();

    // Map req.body to match the Postgres Table naming conventions (snake_case generally, but we can pass keys if they match)
    // We'll normalize the object to map Javascript camelCase to Postgres snake_case where required based on DDL
    const capitalize = (str) => {
      if (!str || typeof str !== 'string') return str;
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const insertPayload = {
      form_type: req.body.formType,
      full_name: capitalize(req.body.fullName),
      company_name: capitalize(req.body.companyName) || null,
      housing_society_name: capitalize(req.body.housingSocietyName) || null,
      organization_name: capitalize(req.body.organizationName) || null,
      city: capitalize(req.body.city),
      pincode: req.body.pincode,
      whatsapp_number: req.body.whatsappNumber,
      monthly_bill: req.body.monthlyBill || null,
      quantity_needed: req.body.capacityRequired ? parseInt(req.body.capacityRequired, 10) : (req.body.quantityNeeded ? parseInt(req.body.quantityNeeded, 10) : null),
      designation: req.body.designation || null,
      agreed_to_terms: req.body.agreedToTerms === true,
    };

    // --- STEP A: SAVE TO SUPABASE ---
    const { data: insertedRecord, error: insertError } = await supabase
      .from("consultation_forms")
      .insert([insertPayload])
      .select()
      .single();

    if (insertError) {
      console.error("Supabase Insert Error:", insertError);
      throw new Error(`Database error: ${insertError.message}`);
    }


    // --- STEP B: PUSH TO N8N (TRIGGER WEBHOOK) ---
    const n8nUrl = process.env.N8N_WEBHOOK_URL;

    if (n8nUrl) {
      try {
        const n8nResponse = await fetch(n8nUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...insertedRecord,
            source: "Website Backend - Supabase",
            submissionTimestamp: new Date().toISOString(),
          }),
        });

        if (n8nResponse.ok) {
        } else {
          console.error(`3. n8n received data but returned error: ${n8nResponse.statusText}`);
        }
      } catch (n8nError) {
        console.error("Warning: Failed to connect to n8n:", n8nError.message);
      }
    } else {
      console.warn("Skipping n8n trigger: N8N_WEBHOOK_URL not found in .env");
    }

    // --- STEP C: SEND RESPONSE TO USER ---
    res.status(201).json({
      success: true,
      message: "Consultation form submitted successfully! Our team will contact you within 24 hours.",
      data: {
        submissionId: insertedRecord.id,
        estimatedContactTime: "24 hours",
        nextSteps: [
          "Technical assessment of your requirements",
          "Site survey scheduling",
          "Customized solar solution proposal",
          "Financial planning and subsidy assistance",
        ],
      },
    });
  } catch (error) {
    console.error("Consultation form error:", error);

    // Provide friendly fallback if validation or constraint violation occurs
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

// --- GET ALL SUBMISSIONS (ADMIN) ---
router.get("/submissions", validateQuery(paginationSchema), async (req, res) => {
  try {
    const { formType, leadStatus, page, limit } = req.query;
    const supabase = connectDB();

    let query = supabase
      .from("consultation_forms")
      .select("*", { count: "exact" });

    // Apply Filters
    if (formType) query = query.eq("form_type", formType);
    if (leadStatus) query = query.eq("lead_status", leadStatus); // Note: Assuming lead_status is mapped previously, though schema doesn't actively track it outside "notes". Adding default gracefully.

    // Apply Pagination
    const from = (page - 1) * limit;
    const to = from + parseInt(limit) - 1;

    const { data: submissions, count: total, error } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Supabase GET Submissions Error:", error);
      throw new Error("Failed to fetch submissions from Supabase");
    }

    // Fallback simple stats calculation since Supabase RPC/Views aren't created yet for complex group_by.
    // Ideally this would be an SQL View/RPC call to offload compute.
    const statusStats = [
      {
        _id: { formType: formType || "All", leadStatus: leadStatus || "Any" },
        count: total
      }
    ];

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
        statistics: {
          statusBreakdown: statusStats,
          totalSubmissions: total,
        },
      },
    });
  } catch (error) {
    console.error("Get consultation submissions error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// --- GET SINGLE SUBMISSION (ADMIN - BYPASSED RLS IF NEEDED LATER, currently uses ANON) ---
// Note: As RLS blocks GET requests entirely at the DB level, you will need a SERVICE_ROLE key to use these.
// For now they will map to the standard Anon REST API but may return nothing due to security logic.
// We are mapping the endpoints logically for completeness.
router.get("/submissions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const supabase = connectDB();

    const { data: submission, error } = await supabase
      .from("consultation_forms")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !submission) {
      return res.status(404).json({ success: false, message: "Submission not found" });
    }

    res.json({ success: true, data: submission });
  } catch (error) {
    console.error("Get submission error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// --- UPDATE LEAD STATUS ---
// Note: As above, RLS will block this if only Anon keys are used in production without user auth.
router.patch(
  "/submissions/:id/status",
  validateParams(objectIdSchema),
  validateSchema(leadStatusUpdateSchema),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { leadStatus, note, assignedTo } = req.body;
      const supabase = connectDB();

      const updateData = { lead_status: leadStatus };
      if (assignedTo) updateData.assigned_to = assignedTo;

      // Note handling: Supabase Postgres doesn't easily push to a JSON array natively without SQL functions,
      // so if 'notes' is a JSONB column, we would fetch first, append, then update.
      // Assuming 'notes' needs to be mapped later if actively used.

      const { data: updatedRecord, error } = await supabase
        .from("consultation_forms")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error || !updatedRecord) {
        return res.status(404).json({ success: false, message: "Submission not found or update failed" });
      }

      res.json({
        success: true,
        message: "Lead status updated successfully in Supabase",
        data: {
          submissionId: updatedRecord.id,
          leadStatus: updatedRecord.lead_status,
        },
      });
    } catch (error) {
      console.error("Update lead status error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
);

// --- DELETE SUBMISSION ---
router.delete("/submissions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const supabase = connectDB();

    const { error } = await supabase
      .from("consultation_forms")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(404).json({ success: false, message: "Submission not found or delete failed" });
    }

    res.json({ success: true, message: "Submission deleted successfully from Supabase" });
  } catch (error) {
    console.error("Delete submission error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
