import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";



const ExpenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    icon: {
      type: String
    },
    category: {
      type: String,
      required: true, //Example: Food, Rent
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

const exporting = mongoose.model("Expense", ExpenseSchema);

export default exporting;