import mongoose from 'mongoose';

const diagnosticSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt
    }
);

export default mongoose.model('Diagnostic', diagnosticSchema);
