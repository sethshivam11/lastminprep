import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface UserI extends Document {
  fullName: string;
  avatar: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode: string;
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
    default:
      "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1741416419/lastminprep/qnzy9jiix6hyfrr4cddx.png",
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
    type: String,
    default: "",
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

const UserModel =
  (mongoose.models.user as mongoose.Model<UserI>) ||
  mongoose.model<UserI>("user", UserSchema);

export default UserModel;
