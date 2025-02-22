import mongoose, { Schema, Document, Model } from "mongoose";
import { Category, Occurrence, Type } from "@shared/types/entry-definitions";
import { AddEntryRequestType } from "@shared/types/common-request";

interface IEntry extends AddEntryRequestType, Document {
  _id: string;
  // --
  userId: mongoose.Schema.Types.ObjectId; // Reference to User model
  excludedDates?: Date[];
  // --
  createdAt: Date;
  updatedAt: Date;
}

const entrySchema: Schema<IEntry> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
    title: { type: String, required: true },
    category: { type: String, enum: Object.values(Category), required: true },
    type: { type: String, enum: Object.values(Type), required: true },
    occurrence: { type: String, enum: Object.values(Occurrence), required: true },
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

export { IEntry };
