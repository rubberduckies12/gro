const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters long'],
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters long'],
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // This creates an index automatically
    trim: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address'
    ]
  },
  position: {
    type: Number,
    default: 0
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  source: {
    type: String,
    enum: ['website', 'social', 'referral', 'other'],
    default: 'website'
  },
  referralCode: {
    type: String,
    sparse: true
  }
}, {
  timestamps: true
});

// Index for faster queries - REMOVED duplicate email index
// waitlistSchema.index({ email: 1 }); // REMOVED: email already has unique: true
waitlistSchema.index({ joinedAt: -1 });
waitlistSchema.index({ position: 1 });

// Pre-save middleware to set position
waitlistSchema.pre('save', async function(next) {
  if (this.isNew && !this.position) {
    try {
      const count = await this.constructor.countDocuments();
      this.position = count + 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Virtual for full name
waitlistSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Static method to get waitlist position
waitlistSchema.statics.getPosition = async function(email) {
  const user = await this.findOne({ email, isActive: true });
  return user ? user.position : null;
};

// Static method to get total waitlist count
waitlistSchema.statics.getTotalCount = async function() {
  return await this.countDocuments({ isActive: true });
};

// Instance method to remove from waitlist
waitlistSchema.methods.removeFromWaitlist = function() {
  this.isActive = false;
  return this.save();
};

const Waitlist = mongoose.model('Waitlist', waitlistSchema);

module.exports = Waitlist;