import { Request, Response } from "express";
import Income from "../models/Income";
import xlsx from "xlsx";

// add income source
export const addIncome = async (req:Request, res:Response) => {
    const userId = (req as any).user.id;

    try{
        const { icon, source, amount, date } = req.body;

        //Validation: Check for missing fields
        if(!source || !amount || !date){
            return res.status(400).json({message: "All fields are required"})
        }
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    }catch(err: any){
        res.status(500).json({message: "Server Error"})
    }
}

// get all income source
export const getAllIncome = async (req:Request, res:Response) => {
    const userId = (req as any).user.id;

    try{
        const income = await Income.find({userId}).sort({date: -1});
        res.json(income);
    }catch(err: any){
        res.status(500).json({message: "Server Error"});
    }
}

// delete income source
export const deleteIncome = async (req:Request, res:Response) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message: "Income deleted successfully"});
    }catch(err: any){
        res.status(500).json({message: "Server Error"})
    }
}

// download excel
export const downloadIncomeExcel = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        xlsx.writeFile(wb, "income_details.xlsx");
        res.download("income_details.xlsx");
    } catch (err: any) {
        res.status(500).json({ message: "Server Error" });
    }
};