import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface TestI extends Document {
  user: ObjectId;
  questions: string;
  difficulty: "easy" | "intermediate" | "hard";
  language: string;
  mcqCount: number;
  codingCount: number;
  jobDescription?: string;
  extraDescription?: string;
  attempts: ObjectId[];
}

const TestSchema: Schema<TestI> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  questions: {
    type: String,
    required: true,
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
});

const TestModel = (mongoose.models.test ||
  mongoose.model<TestI>("test", TestSchema)) as mongoose.Model<TestI>;

export default TestModel;
