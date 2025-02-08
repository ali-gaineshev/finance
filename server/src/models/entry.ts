import mongoose, { Schema, Document, Model } from "mongoose";


export interface IEntry extends Document {
    category: string;
    type: string;
    occurrence: string;
    date: Date;
    userId: mongoose.Schema.Types.ObjectId; // Reference to User model
    createdAt: Date;
    updatedAt: Date;
}


const entrySchema: Schema<IEntry> = new Schema(
    {
        category: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        occurrence: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }, // Reference to User model
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);

// Create and export the model
const Entry: Model<IEntry> = mongoose.model<IEntry>("Entry", entrySchema);
export default Entry;
