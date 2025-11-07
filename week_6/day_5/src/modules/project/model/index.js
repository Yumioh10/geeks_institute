import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
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
        enum: ['pending', 'active', 'completed', 'archived'],
        default: 'pending'
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

export const projectModel = mongoose.model('Project', projectSchema);