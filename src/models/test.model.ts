import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface TestI extends Document {
  name: string;
  user: ObjectId;
  questions: {
    mcqs: MCQI[];
    coding: CodingI[];
  };
  difficulty: "easy" | "intermediate" | "hard";
  language: string;
  mcqCount: number;
  codingCount: number;
  jobDescription?: string;
  extraDescription?: string;
  createdAt: Date;
}

export interface MCQI extends Document {
  question: string;
  code: string;
  options: string[];
  answer: string;
}

export interface CodingI extends Document {
  question: string;
  constraints: string;
  exampleInput: string;
  exampleOutput: string;
}

const MCQSchema: Schema<MCQI> = new Schema({
  question: { type: String, required: true },
  code: { type: String, default: "" },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
});

const CodingSchema: Schema<CodingI> = new Schema({
  question: { type: String, required: true },
  constraints: { type: String, default: "" },
  exampleInput: { type: String },
  exampleOutput: { type: String },
});

const TestSchema: Schema<TestI> = new Schema({
  name: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  questions: {
    mcqs: [MCQSchema],
    coding: [CodingSchema],
  },
  language: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "intermediate", "hard"],
    required: true,
  },
  mcqCount: {
    type: Number,
    required: true,
  },
  codingCount: {
    type: Number,
    required: true,
  },
  jobDescription: String,
  extraDescription: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const TestModel = (mongoose.models.test ||
  mongoose.model<TestI>("test", TestSchema)) as mongoose.Model<TestI>;

export default TestModel;
