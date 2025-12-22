import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";



const IncomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    icon: {
      type: String
    },
    source: {
      type: String,
      required: true, //Example: Salary, Freelance, etc.
    },
    amount: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const exporting = mongoose.model("Income", IncomeSchema);

export default exporting;