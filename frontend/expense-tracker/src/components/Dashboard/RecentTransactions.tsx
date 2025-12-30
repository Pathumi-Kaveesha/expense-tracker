import React from "react";
import moment from "moment";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

interface RecentTransactionsProps {
  transactions: any[];
  onSeeMore: () => void;
  onDeleteTransaction: (id: string) => void; // new prop for delete
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  onSeeMore,
  onDeleteTransaction,
}) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === "expense" ? item.category : item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            onDelete={() => onDeleteTransaction(item._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
