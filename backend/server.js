import express from "express";
import cors from "cors";
// import helmet from "helmet"; // Re-enable in production
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import { z, ZodError } from "zod";
import solarCalculatorRoutes from "./routes/solarCalculator.js";
import consultationFormRoutes from "./routes/consultationForm.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use((req, res, next) => {
  console.log(`--> ${req.method} ${req.originalUrl} hit global middleware`);
  next();
});


// Development logger
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.use("/api/solar-calculator", solarCalculatorRoutes);
app.use("/api/consultation", consultationFormRoutes);


// Health check
app.get("/api/health", (req, res) => {
  console.log("🏥 Health check endpoint hit");
  res.json({
    success: true,
    message: "Lighthouse Energy API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

// API docs
app.get("/api/docs", (req, res) => {
  res.json({
    success: true,
    message: "Lighthouse Energy API Documentation",
    endpoints: {
      solarCalculator: {
        "POST /api/solar-calculator/calculate": "Submit solar calculator form",
        "GET /api/solar-calculator/submissions":
          "Get all calculator submissions (admin)",
        "GET /api/solar-calculator/calculation/:id":
          "Get specific calculation by ID",
      },
      consultation: {
        "POST /api/consultation/submit": "Submit consultation form",
        "GET /api/consultation/submissions":
          "Get all consultation submissions (admin)",
        "GET /api/consultation/submissions/:id":
          "Get specific submission by ID",
        "PATCH /api/consultation/submissions/:id/status": "Update lead status",
        "DELETE /api/consultation/submissions/:id": "Delete submission (admin)",
      },
      general: {
        "GET /api/health": "API health check",
        "GET /api/docs": "API documentation",
      },
    },
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error stack:", err.stack || err);
  if (err instanceof ZodError) {
    const errs = err.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return res.status(400).json({ success: false, errors: errs });
  }
  if (err.name === "ValidationError") {
    const errs = Object.values(err.errors).map((e) => e.message);
    return res
      .status(400)
      .json({ success: false, message: "Validation error", errors: errs });
  }
  if (err.name === "CastError") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid data format" });
  }
  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: "Duplicate entry" });
  }
  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
    availableRoutes: [
      "GET /api/health",
      "GET /api/docs",
      "POST /api/solar-calculator/calculate",
      "GET /api/solar-calculator/submissions",
      "POST /api/consultation/submit",
      "GET /api/consultation/submissions",
    ],
  });
});

// Start server
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Lighthouse Energy API running on port ${PORT}`);
  console.log(`📖 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📚 API docs:    http://localhost:${PORT}/api/docs`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});

export default app;
