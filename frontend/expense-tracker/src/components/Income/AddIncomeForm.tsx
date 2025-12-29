import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

interface IncomeData {
  source: string;
  amount: number;
  date: string;
  icon?: string;
}

interface AddIncomeFormProps {
  onAddIncome: (income: IncomeData) => void;
}

const AddIncomeForm: React.FC<AddIncomeFormProps> = ({ onAddIncome }) => {
  const [income, setIncome] = useState<IncomeData>({
    source: "",
    amount: 0,
    date: "",
    icon: "",
  });

  // for Input components
  const handleInputChange = (
    key: "source" | "amount" | "date",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = key === "amount" ? Number(e.target.value) : e.target.value;
    setIncome({ ...income, [key]: value });
  };

  // for emoji picker
  const handleIconChange = (icon: string) => {
    setIncome({ ...income, icon });
  };

  return (
    <div>
      <EmojiPickerPopup icon={income.icon} onSelect={handleIconChange} />

      <Input
        value={income.source}
        onChange={(e) => handleInputChange("source", e)}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
      />

      <Input
        value={income.amount.toString()}
        onChange={(e) => handleInputChange("amount", e)}
        label="Amount"
        type="number"
      />

      <Input
        value={income.date}
        onChange={(e) => handleInputChange("date", e)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
