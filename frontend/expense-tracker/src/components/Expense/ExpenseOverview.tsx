import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomeLineChart from "../Charts/CustomeLineChart";
import moment from "moment";

interface ExpenseTransaction {
  _id: string;
  category: string;
  date: string;
  amount: number;
}

interface ExpenseOverviewProps {
  transactions: ExpenseTransaction[];
  onExpenseIncome: () => void;
}

interface ChartDataItem {
  date: string;
  amount: number;
  category: string;
}

const ExpenseOverview: React.FC<ExpenseOverviewProps> = ({
  transactions,
  onExpenseIncome,
}) => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending trends over time and gain insights into where
            your money goes.
          </p>
        </div>

        <button className="add-btn" onClick={onExpenseIncome}>
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        <CustomeLineChart
          data={chartData.map((item) => ({
            date: item.date,
            category: item.category,
            amount: item.amount,
          }))}
        />
      </div>
    </div>
  );
};

export default ExpenseOverview;
