import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ProfileI extends Document {
  user: ObjectId;
  bio: string;
  location: string;
  skills: string[];
  birthday: Date;
  gender: "male" | "female" | "others" | "prefer not to say";
  social: {
    x: string;
    linkedin: string;
    github: string;
    website: string;
  };
  createdAt: Date;
}

const ProfileSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  bio: String,
  location: String,
  skills: [String],
  birthday: Date,
  gender: {
    type: String,
    enum: ["male", "female", "others", "prefer not to say"],
  },
  social: {
    x: String,
    linkedin: String,
    github: String,
    website: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProfileModel = (mongoose.models.profile ||
  mongoose.model<ProfileI>(
    "profile",
    ProfileSchema
  )) as mongoose.Model<ProfileI>;

export default ProfileModel;
