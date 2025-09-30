import mongoose from "mongoose";

const consultationFormSchema = new mongoose.Schema({
  formType: {
    type: String,
    enum: ["residential", "housing", "commercial"], // Make sure all three values are here
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "Full name must be at least 2 characters"],
    maxlength: [50, "Full name cannot exceed 50 characters"],
  },
  whatsappNumber: {
    type: String,
    required: true,
    match: [/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"],
  },
  city: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "City name must be at least 2 characters"],
    maxlength: [50, "City name cannot exceed 50 characters"],
  },
  pincode: {
    type: String,
    match: [/^\d{6}$/, "Please enter a valid 6-digit pincode"],
  },
  monthlyBill: {
    type: String,
    required: true,
  },
  agreeToTerms: {
    type: Boolean,
    required: true,
    validate: {
      validator: function (v) {
        return v === true;
      },
      message: "You must agree to the terms and conditions",
    },
  },

  // Housing Society specific fields
  housingSocietyName: {
    type: String,
    trim: true,
    minlength: [3, "Housing society name must be at least 3 characters"],
    maxlength: [100, "Housing society name cannot exceed 100 characters"],
  },
  designation: {
    type: String,
    enum: [
      "Management committee member",
      "Resident",
      "Builder",
      "Facility Manager",
    ],
  },
  agmApproval: {
    type: String,
    enum: [
      "We already have AGM approval",
      "We don't have an AGM approval yet",
      "We want help in preparing for our AGM",
    ],
  },

  // Commercial specific fields
  companyName: {
    type: String,
    trim: true,
    minlength: [2, "Company name must be at least 2 characters"],
    maxlength: [100, "Company name cannot exceed 100 characters"],
  },

  // Lead management
  leadStatus: {
    type: String,
    enum: ["new", "contacted", "qualified", "converted"],
    default: "new",
  },
  notes: [
    {
      note: {
        type: String,
        maxlength: [500, "Note cannot exceed 500 characters"],
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
      addedBy: {
        type: String,
        maxlength: [50, "Added by cannot exceed 50 characters"],
      },
    },
  ],
  assignedTo: {
    type: String,
    maxlength: [50, "Assigned to cannot exceed 50 characters"],
  },

  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes for better query performance
consultationFormSchema.index({ submittedAt: -1 });
consultationFormSchema.index({ formType: 1 });
consultationFormSchema.index({ leadStatus: 1 });
consultationFormSchema.index({ whatsappNumber: 1 });

export default mongoose.model("ConsultationForm", consultationFormSchema);
