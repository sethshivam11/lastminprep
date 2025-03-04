import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface UserI extends Document {
  fullName: string;
  avatar: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode: number;
  codeExpiry: Date;
  profile: ObjectId;
  createdAt: Date;
}

const UserSchema: Schema<UserI> = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyCode: {
    type: Number,
  },
  codeExpiry: {
    type: Date,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profile",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User =
  (mongoose.models.user as mongoose.Model<UserI>) ||
  mongoose.model<UserI>("user", UserSchema);

export default User;
