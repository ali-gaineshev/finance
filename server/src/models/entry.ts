import mongoose, { Schema, Document, Model } from "mongoose";
import { Occurrence } from "@shared/types/entry-definitions";

export interface IEntry extends Document {
  _id: string;
  title: string;
  userId: mongoose.Schema.Types.ObjectId; // Reference to User model
  category: string;
  type: string;
  occurrence: Occurrence;
  startDate: Date;
  endDate?: Date;
  excludedDates?: Date[];
  createdAt: Date;
  updatedAt: Date;
}

const entrySchema: Schema<IEntry> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
    title: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    occurrence: {
      type: String,
      enum: Object.values(Occurrence),
      required: true,
    },
    startDate: { type: Date, required: true, default: Date.now },
    endDate: { type: Date }, // Optional end date
    excludedDates: { type: Array },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  },
);

// Create and export the model
const Entry: Model<IEntry> = mongoose.model<IEntry>("Entry", entrySchema);
export default Entry;
