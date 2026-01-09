import express from "express";
import { z } from "zod";
import ConsultationForm from "../models/ConsultationForm.js";
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

// Middleware for logging
router.use((req, res, next) => {
  console.log(
    `--> Consultation router middleware: ${req.method} ${req.originalUrl}`
  );
  next();
});

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
    console.log("1. Received Submission Request");

    // Create new document from request body
    const formData = new ConsultationForm(req.body);

    // --- STEP A: SAVE TO MONGODB ---
    await formData.save();
    console.log(`2. Data Saved to MongoDB (ID: ${formData._id})`);

    // --- STEP B: PUSH TO N8N (TRIGGER WEBHOOK) ---
    const n8nUrl = process.env.N8N_WEBHOOK_URL;

    if (n8nUrl) {
      try {
        const n8nResponse = await fetch(n8nUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData.toObject(),
            source: "Website Backend",
            submissionTimestamp: new Date().toISOString(),
          }),
        });

        if (n8nResponse.ok) {
          console.log("3. Data successfully pushed to n8n");
        } else {
          console.error(
            `3. n8n received data but returned error: ${n8nResponse.statusText}`
          );
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
      message:
        "Consultation form submitted successfully! Our team will contact you within 24 hours.",
      data: {
        submissionId: formData._id,
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

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A consultation request with this mobile number already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// --- GET ALL SUBMISSIONS (ADMIN) ---
router.get(
  "/submissions",
  validateQuery(paginationSchema),
  async (req, res) => {
    try {
      const { formType, leadStatus, page, limit } = req.query;

      const filter = {};
      if (formType) filter.formType = formType;
      if (leadStatus) filter.leadStatus = leadStatus;

      const submissions = await ConsultationForm.find(filter)
        .sort({ submittedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("-__v");

      const total = await ConsultationForm.countDocuments(filter);

      const statusStats = await ConsultationForm.aggregate([
        { $match: filter },
        {
          $group: {
            _id: { formType: "$formType", leadStatus: "$leadStatus" },
            count: { $sum: 1 },
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
  }
);

// --- GET SINGLE SUBMISSION ---
router.get(
  "/submissions/:id",
  validateParams(objectIdSchema),
  async (req, res) => {
    try {
      const { id } = req.params;
      const submission = await ConsultationForm.findById(id).select("-__v");

      if (!submission) {
        return res
          .status(404)
          .json({ success: false, message: "Submission not found" });
      }

      res.json({ success: true, data: submission });
    } catch (error) {
      console.error("Get submission error:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
);

// --- UPDATE LEAD STATUS ---
router.patch(
  "/submissions/:id/status",
  validateParams(objectIdSchema),
  validateSchema(leadStatusUpdateSchema),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { leadStatus, note, assignedTo } = req.body;

      const updateData = { leadStatus };
      if (assignedTo) updateData.assignedTo = assignedTo;

      const submission = await ConsultationForm.findById(id);
      if (!submission) {
        return res
          .status(404)
          .json({ success: false, message: "Submission not found" });
      }

      if (note) {
        submission.notes.push({
          note,
          addedBy: req.user?.name || "Admin",
        });
      }

      Object.assign(submission, updateData);
      await submission.save();

      res.json({
        success: true,
        message: "Lead status updated successfully",
        data: {
          submissionId: submission._id,
          leadStatus: submission.leadStatus,
          assignedTo: submission.assignedTo,
          notesCount: submission.notes.length,
        },
      });
    } catch (error) {
      console.error("Update lead status error:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
);

// --- DELETE SUBMISSION ---
router.delete(
  "/submissions/:id",
  validateParams(objectIdSchema),
  async (req, res) => {
    try {
      const { id } = req.params;
      const submission = await ConsultationForm.findByIdAndDelete(id);

      if (!submission) {
        return res
          .status(404)
          .json({ success: false, message: "Submission not found" });
      }

      res.json({ success: true, message: "Submission deleted successfully" });
    } catch (error) {
      console.error("Delete submission error:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
);

export default router;
