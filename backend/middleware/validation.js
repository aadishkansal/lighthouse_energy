// Generic Zod validation middleware
import { z, ZodError } from "zod";

export const validateSchema = (schema) => {
  console.log("Middleware check start");                                                       
    return (req, res, next) => {
    try {
      // Validate request body
      const validatedData = schema.parse(req.body);
      console.log("Validated ", validatedData);
      req.body = validatedData; // Replace with validated data
      next();
    } catch (error) {
      console.error("Validation error caught in middleware:", error);

      if (error instanceof ZodError) {
        // Safely handle error.errors possibly undefined
        const errorMessages = Array.isArray(error.errors)
          ? error.errors.map((err) => ({
              field: err.path.join("."),
              message: err.message,
            }))
          : [{ field: "", message: error.message || "Validation error" }];

        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errorMessages,
        });
      }

      // Handle other validation errors
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
      });
    }
  };
};

// Query validation middleware
export const validateQuery = (schema) => {
  return (req, res, next) => {
    try {
      const validatedQuery = schema.parse(req.query);
      req.query = validatedQuery;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          message: "Invalid query parameters",
          errors: errorMessages,
        });
      }

      return res.status(400).json({
        success: false,
        message: "Invalid query parameters",
      });
    }
  };
};

// Params validation middleware
export const validateParams = (schema) => {
  return (req, res, next) => {
    try {
      const validatedParams = schema.parse(req.params);
      req.params = validatedParams;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid parameters",
          errors: error.errors,
        });
      }

      return res.status(400).json({
        success: false,
        message: "Invalid parameters",
      });
    }
  };
};
