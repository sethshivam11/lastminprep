import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface AttemptI extends Document {
  user: ObjectId;
  test: ObjectId;
  mcqScore: number;
  codingScore: number;
  answers: {
    mcqs: {
      question: string;
      answer: string;
      correct: boolean;
    }[];
    coding: {
      question: string;
      answer: string;
      marks: number;
      feedback?: string;
    }[];
  };
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
  answers: {
    type: {
      mcqs: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
          correct: { type: Boolean, default: false },
        },
      ],
      coding: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
          marks: { type: Number, default: 0, min: 0, max: 10 },
          feedback: { type: String, default: "" },
        },
      ],
    },
    default: {
      mcqs: [],
      coding: [],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AttemptModel = (mongoose.models.attempt ||
  mongoose.model<AttemptI>(
    "attempt",
    AttemptSchema
  )) as mongoose.Model<AttemptI>;

export default AttemptModel;
