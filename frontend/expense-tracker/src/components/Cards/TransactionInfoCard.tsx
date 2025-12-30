import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

interface TransactionInfoCardProps {
  title: string;
  icon?: React.ReactNode;
  date: string;
  amount: number | string;
  type: "income" | "expense";
  onDelete?: () => void;
  hideDeleteBtn?: boolean; // <-- added this
}

const TransactionInfoCard: React.FC<TransactionInfoCardProps> = ({
  title,
  icon,
  date,
  amount,
  type,
  onDelete,
  hideDeleteBtn = false, // default to false
}) => {
  const getAmountStyles = () =>
    type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";

  const renderIcon = () => {
    if (!icon) return <LuUtensils />;
    if (typeof icon === "string") {
      return <img src={icon} alt={title} className="w-8 h-8 object-contain" />;
    }
    return icon;
  };

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100 transition-all duration-200">
      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full overflow-hidden">
        {renderIcon()}
      </div>

      <div className="flex-1 flex justify-between items-center">
        <div className="overflow-hidden">
          <p className="text-sm text-gray-700 font-medium truncate">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && onDelete && (
            <button
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md flex-shrink-0 ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"} ${amount}
            </h6>
            {type === "income" ? (
              <LuTrendingUp size={14} />
            ) : (
              <LuTrendingDown size={14} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
