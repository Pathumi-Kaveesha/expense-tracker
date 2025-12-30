import moment from "moment";

// Validate email format
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Get initials from full name (first letter of first two words)
export const getInitials = (name: string): string => {
  if (!name) return "";

  const words = name.trim().split(" "); 
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    if (words[i].length > 0) {
      initials += words[i][0];
    }
  }

  return initials.toUpperCase();
};

// Add thousands separator to numbers
export const addThousandsSeparator = (num: number | null | undefined): string => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};


interface ExpenseItem {
  category?: string;
  amount?: number;
}

export const prepareExpenseBarChartData = (data: ExpenseItem[] = []) => {
  return data.map((item) => ({
    category: item.category,
    amount: item.amount,
  }));
};


interface IncomeTransaction {
  _id: string;
  source: string;
  date: string;
  amount: number;
}


export const prepareIncomeBarChartData = (data: IncomeTransaction[] = []) => {
  // Sort by date ascending
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Map to chart format
  const chartData = sortedData.map((item) => ({
    month: moment(item.date).format("Do MMM"), // e.g., 29 Dec
    amount: item.amount,
    source: item.source,
  }));

  return chartData;
};


interface ExpenseTransaction {
  _id: string;
  category: string;
  date: string;
  amount: number;
}

export const prepareExpenseLineChartData = (data: ExpenseTransaction[] = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );  

  const chartData = sortedData.map((item) => ({
    date : moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    category: item?.category
  }));
  return chartData;
}