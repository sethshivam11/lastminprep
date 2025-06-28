import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface UserI extends Document {
  fullName: string;
  avatar: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode: string;
  codeExpiry: Date;
  limits: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  usage: Date[];
  profile: ObjectId;
  loginType: "email" | "google" | "github";
  createdAt: Date;
}

export const DEFAULT_USER_AVATAR =
  "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1741416419/lastminprep/qnzy9jiix6hyfrr4cddx.png";

const UserSchema: Schema<UserI> = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: DEFAULT_USER_AVATAR,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: "",
    select: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyCode: {
    type: String,
    default: "",
  },
  codeExpiry: Date,
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profile",
  },
  limits: {
    daily: {
      type: Number,
      default: 10,
    },
    weekly: {
      type: Number,
      default: 60,
    },
    monthly: {
      type: Number,
      default: 200,
    },
  },
  usage: [Date],
  loginType: {
    type: String,
    default: "email",
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
