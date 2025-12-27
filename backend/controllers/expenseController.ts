import { Request, Response } from "express";
import Expense from "../models/Expense";
import xlsx from "xlsx";

// add Expense source
export const addExpense = async (req:Request, res:Response) => {
    const userId = (req as any).user.id;

    try{
        const { icon, category, amount, date } = req.body;

        //Validation: Check for missing fields
        if(!category || !amount || !date){
            return res.status(400).json({message: "All fields are required"})
        }
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    }catch(err: any){
        res.status(500).json({message: "Server Error"})
    }
}

// get all Expense source
export const getAllExpense = async (req:Request, res:Response) => {
    const userId = (req as any).user.id;

    try{
        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expense);
    }catch(err: any){
        res.status(500).json({message: "Server Error"});
    }
}

// delete Expense source
export const deleteExpense = async (req: Request, res: Response) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.json({ message: "Expense deleted successfully" });
    } catch (err: any) {
        res.status(500).json({ message: "Server Error" });
    }
};


// download excel
export const downloadExpenseExcel = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        const data = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");

        xlsx.writeFile(wb, "expense_details.xlsx");
        res.download("expense_details.xlsx");
    } catch (err: any) {
        res.status(500).json({ message: "Server Error" });
    }
};