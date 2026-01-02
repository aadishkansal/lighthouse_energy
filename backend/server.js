import express from "express";
import cors from "cors";
// import helmet from "helmet"; // Re-enable in production
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import { z, ZodError } from "zod";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS - Simple configuration first
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);

      // 1. Allow origins explicitly defined in the array
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // 2. Allow ANY Vercel deployment (Dynamic check for previews)
      // This is the magic line that fixes your current error
      if (origin.endsWith(".vercel.app")) return callback(null, true);

      // Block everything else
      console.log("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"), false);
    },
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

// Import routes with try-catch to identify which file has the issue
console.log("📁 Loading route files...");

let solarCalculatorRoutes;
let consultationFormRoutes;

try {
  console.log("  Loading solar calculator routes...");
  solarCalculatorRoutes = (await import("./routes/solarCalculator.js")).default;
  console.log("  ✅ Solar calculator routes loaded successfully");
} catch (error) {
  console.error("  ❌ Error loading solar calculator routes:", error.message);
  console.error("     Full error:", error);
}

try {
  console.log("  Loading consultation form routes...");
  consultationFormRoutes = (await import("./routes/consultationForm.js"))
    .default;
  console.log("  ✅ Consultation form routes loaded successfully");
} catch (error) {
  console.error("  ❌ Error loading consultation form routes:", error.message);
  console.error("     Full error:", error);
}

// Routes - only add if successfully loaded
if (solarCalculatorRoutes) {
  try {
    app.use("/api/solar-calculator", solarCalculatorRoutes);
    console.log("✅ Solar calculator routes registered");
  } catch (error) {
    console.error(
      "❌ Error registering solar calculator routes:",
      error.message
    );
  }
}

if (consultationFormRoutes) {
  try {
    app.use("/api/consultation", consultationFormRoutes);
    console.log("✅ Consultation form routes registered");
  } catch (error) {
    console.error(
      "❌ Error registering consultation form routes:",
      error.message
    );
  }
}


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Lighthouse Energy API is running successfully 🚀",
    timestamp: new Date().toISOString(),
    documentation: "/api/docs",
  });
});

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
        "GET /": "Root check",
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
      "GET /",
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
