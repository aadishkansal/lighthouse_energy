import { z, ZodError } from "zod";

// Indian states enum for validation
const IndianStates = z.enum([
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
]);

// Indian mobile number regex
const indianMobileRegex = /^[6-9]\d{9}$/;

// Indian pincode regex
const indianPincodeRegex = /^\d{6}$/;

// --- Solar Calculator Schema ---
export const solarCalculatorSchema = z.object({
  state: IndianStates,
  monthlyBill: z.preprocess(
    (val) =>
      typeof val === "string" || typeof val === "number" ? Number(val) : val,
    z
      .number()
      .positive("Monthly bill must be a positive number")
      .min(100, "Monthly bill must be at least ₹100")
      .max(100000, "Monthly bill cannot exceed ₹100,000")
  ),
  rooftopArea: z.preprocess(
    (val) =>
      typeof val === "string" || typeof val === "number" ? Number(val) : val,
    z
      .number()
      .positive("Rooftop area must be a positive number")
      .min(50, "Minimum rooftop area should be 50 sq.ft")
      .max(10000, "Maximum rooftop area cannot exceed 10,000 sq.ft")
  ),
  mobileNumber: z
    .string()
    .regex(indianMobileRegex, "Please enter a valid Indian mobile number"),
  propertyType: z.enum(["residential", "commercial"]),
  whatsappContact: z.preprocess(
    (val) => val === "true" || val === true,
    z.boolean().default(true)
  ),
});

// --- Base Consultation Schema ---
const baseConsultationSchema = z.object({
  formType: z.string(),
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name should only contain letters and spaces"),
  whatsappNumber: z
    .string()
    .regex(indianMobileRegex, "Please enter a valid Indian mobile number"),
  city: z
    .string()
    .min(2, "City name must be at least 2 characters")
    .max(50, "City name cannot exceed 50 characters"),
  pincode: z
    .string()
    .regex(indianPincodeRegex, "Please enter a valid 6-digit pincode")
    .optional(),
  monthlyBill: z.preprocess(
    (val) => (typeof val === "number" ? String(val) : val),
    z.string().min(1, "Please select monthly bill range")
  ),
  agreeToTerms: z
    .boolean()
    .refine(
      (val) => val === true,
      "You must agree to the terms and conditions"
    ),
});

// Define each variant with explicit discriminator 'formType' literal
export const residentialSchema = baseConsultationSchema.extend({
  formType: z.literal("residential"),
});

export const housingSchema = baseConsultationSchema.extend({
  formType: z.literal("housing"),
  housingSocietyName: z
    .string()
    .min(3, "Housing society name must be at least 3 characters")
    .max(100, "Housing society name cannot exceed 100 characters"),
  designation: z.enum([
    "Management committee member",
    "Resident",
    "Builder",
    "Facility Manager",
  ]),
  agmApproval: z.enum([
    "We already have AGM approval",
    "We don't have an AGM approval yet",
    "We want help in preparing for our AGM", 
  ]),
});

export const commercialSchema = baseConsultationSchema.extend({
  formType: z.literal("commercial"),
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name cannot exceed 100 characters"),
});

// Discriminated union with explicit unique discriminator values
export const consultationSchema = z.discriminatedUnion("formType", [
  residentialSchema,
  housingSchema,
  commercialSchema,
]);

// Lead status update schema
export const leadStatusUpdateSchema = z.object({
  leadStatus: z.enum(["new", "contacted", "qualified", "converted"]),
  note: z.string().max(500, "Note cannot exceed 500 characters").optional(),
  assignedTo: z
    .string()
    .max(50, "Assigned to cannot exceed 50 characters")
    .optional(),
});

// Pagination schema
export const paginationSchema = z.object({
  page: z.string().transform((val) => parseInt(val) || 1),
  limit: z.string().transform((val) => Math.min(parseInt(val) || 10, 100)),
  formType: z.enum(["residential", "housing", "commercial"]).optional(),
  // Using same "housing" key as discriminator
  leadStatus: z.enum(["new", "contacted", "qualified", "converted"]).optional(),
});

// Validation middleware
export const validateSchema = (schema) => {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors,
        });
      }
      next(error);
    }
  };
};
