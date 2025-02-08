import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface for the User document
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
    },
    {
        timestamps: true, // adds createdAt & updatedAt fields
    }
);

// Create and export the model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
