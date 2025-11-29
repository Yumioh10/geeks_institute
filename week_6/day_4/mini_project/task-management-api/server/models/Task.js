const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [100, 'Title must not exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description must not exceed 500 characters'],
      default: ''
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'in-progress', 'completed'],
        message: '{VALUE} is not a valid status'
      },
      default: 'pending'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    dueDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    versionKey: false // Removes __v field
  }
);

// Add index for better query performance
taskSchema.index({ status: 1 });
taskSchema.index({ createdAt: -1 });

// Instance method to format task data
taskSchema.methods.toJSON = function() {
  const task = this.toObject();
  task.id = task._id;
  delete task._id;
  return task;
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
