import express from 'express';
import { z } from 'zod';
import ConsultationForm from '../models/ConsultationForm.js';
import { validateSchema, validateQuery, validateParams } from '../middleware/validation.js';
import { 
  consultationSchema, 
  paginationSchema, 
  leadStatusUpdateSchema 
} from '../validation/schemas.js';

const router = express.Router();

// In consultationForm.js router file, at very top
router.use((req, res, next) => {
  console.log(`--> Consultation router middleware: ${req.method} ${req.originalUrl}`);
  next();
});

// Object ID validation schema
const objectIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format')
});

// Submit consultation form
console.log("mounting consultation");

router.post('/submit', validateSchema(consultationSchema), async (req, res) => {
  try {
    console.log("in the function");
    const formData = new ConsultationForm(req.body);
    console.log(formData);
    await formData.save();
    
    // Send confirmation email or SMS (implement as needed)
    // await sendConfirmationMessage(formData.whatsappNumber, formData.fullName);

    res.status(201).json({
      success: true,
      message: 'Consultation form submitted successfully! Our team will contact you within 24 hours.',
      data: {
        submissionId: formData._id,
        estimatedContactTime: '24 hours',
        nextSteps: [
          'Technical assessment of your requirements',
          'Site survey scheduling',
          'Customized solar solution proposal',
          'Financial planning and subsidy assistance'
        ]
      }
    });
  } catch (error) {
    console.error('Consultation form error:', error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    
    // Handle duplicate key errors (if mobile number is unique)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A consultation request with this mobile number already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all consultation submissions (admin)
router.get('/submissions', validateQuery(paginationSchema), async (req, res) => {
  try {
    const { formType, leadStatus, page, limit } = req.query;

    const filter = {};
    if (formType) filter.formType = formType;
    if (leadStatus) filter.leadStatus = leadStatus;

    const submissions = await ConsultationForm.find(filter)
      .sort({ submittedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-__v');

    const total = await ConsultationForm.countDocuments(filter);

    // Get statistics by form type and lead status
    const statusStats = await ConsultationForm.aggregate([
      { $match: filter },
      {
        $group: {
          _id: { formType: '$formType', leadStatus: '$leadStatus' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        submissions,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        },
        statistics: {
          statusBreakdown: statusStats,
          totalSubmissions: total
        }
      }
    });
  } catch (error) {
    console.error('Get consultation submissions error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get single submission by ID
router.get('/submissions/:id', validateParams(objectIdSchema), async (req, res) => {
  try {
    const { id } = req.params;
    
    const submission = await ConsultationForm.findById(id).select('-__v');
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.json({
      success: true,
      data: submission
    });
  } catch (error) {
    console.error('Get submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update lead status
router.patch('/submissions/:id/status', 
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
        return res.status(404).json({
          success: false,
          message: 'Submission not found'
        });
      }

      // Add note if provided
      if (note) {
        submission.notes.push({
          note,
          addedBy: req.user?.name || 'Admin' // Assuming user auth middleware
        });
      }

      // Update fields
      Object.assign(submission, updateData);
      await submission.save();

      res.json({
        success: true,
        message: 'Lead status updated successfully',
        data: {
          submissionId: submission._id,
          leadStatus: submission.leadStatus,
          assignedTo: submission.assignedTo,
          notesCount: submission.notes.length
        }
      });
    } catch (error) {
      console.error('Update lead status error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
);

// Delete submission (admin only)
router.delete('/submissions/:id', validateParams(objectIdSchema), async (req, res) => {
  try {
    const { id } = req.params;
    
    const submission = await ConsultationForm.findByIdAndDelete(id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.json({
      success: true,
      message: 'Submission deleted successfully'
    });
  } catch (error) {
    console.error('Delete submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;