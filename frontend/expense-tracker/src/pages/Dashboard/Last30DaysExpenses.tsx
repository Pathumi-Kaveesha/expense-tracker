import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomeBarChart from "../../components/Charts/CustomeBarChart";

interface Expense {
  date: string | Date;
  amount: number;
  category?: string;
}

interface Last30DaysExpensesProps {
  data: Expense[];
}

const Last30DaysExpenses: React.FC<Last30DaysExpensesProps> = ({ data }) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>

      <CustomeBarChart data={chartData} />
    </div>
  );
};

export default Last30DaysExpenses;
