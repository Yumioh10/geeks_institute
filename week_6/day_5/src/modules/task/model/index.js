import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'done'],
        default: 'todo'
    },
    // Reference to the parent Project (Required)
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    // The user who owns/created this task (Required for role-based access)
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

export const taskModel = mongoose.model('Task', taskSchema);