import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface AttemptI extends Document {
  user: ObjectId;
  test: ObjectId;
  mcqScore: number;
  codingScore: number;
  totalScore: number;
  createdAt: Date;
}

const AttemptSchema: Schema<AttemptI> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  test: {
    type: Schema.Types.ObjectId,
    ref: "test",
    required: true,
  },
  mcqScore: {
    type: Number,
    required: true,
  },
  codingScore: {
    type: Number,
    required: true,
  },
  totalScore: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AttemptModel = (mongoose.models.attempt ||
  mongoose.model<AttemptI>("attempt", AttemptSchema)) as mongoose.Model<AttemptI>;

  export default AttemptModel;