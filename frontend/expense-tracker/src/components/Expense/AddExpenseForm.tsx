import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

interface ExpenseData {
  category: string;
  amount: number;
  date: string;
  icon: string;
}

interface AddExpenseFormProps {
  onAddExpense: (expense: ExpenseData) => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onAddExpense }) => {
  const [expense, setExpense] = useState<ExpenseData>({
    category: "",
    amount: 0,
    date: "",
    icon: "",
  });

  // for Input components
  const handleChange = (
    key: "category" | "amount" | "date",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = key === "amount" ? Number(e.target.value) : e.target.value;
    setExpense({ ...expense, [key]: value });
  };

  // for emoji picker
  const handleIconChange = (icon: string) => {
    setExpense({ ...expense, icon });
  };

  return (
    <div>
      <EmojiPickerPopup icon={expense.icon} onSelect={handleIconChange} />

      <Input
        value={expense.category}
        onChange={(e) => handleChange("category", e)}
        label="Expense Category"
        placeholder="Food, Rent, Transport, etc"
        type="text"
      />

      <Input
        value={expense.amount.toString()}
        onChange={(e) => handleChange("amount", e)}
        label="Amount"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={(e) => handleChange("date", e)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
