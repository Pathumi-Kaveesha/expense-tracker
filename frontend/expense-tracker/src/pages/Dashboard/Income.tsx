import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";

// Define the type of a single income transaction
export interface IncomeTransaction {
  _id: string;
  source: string;
  icon?: React.ReactNode;
  date: string;
  amount: number;
}

const Income: React.FC = () => {
  const [incomeData, setIncomeData] = useState<IncomeTransaction[]>([]);
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState<{
    show: boolean;
    data: IncomeTransaction | null;
  }>({
    show: false,
    data: null,
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Get all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle add income
  const handleAddIncome = async (income: Omit<IncomeTransaction, "_id">) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.INCOME.ADD_INCOME,
        income
      );

      if (response.data) {
        // Add the newly created income (with _id) to state
        setIncomeData((prev) => [...prev, response.data]);
        setOpenAddIncomeModal(false);
      }
    } catch (error) {
      console.log("Failed to add income", error);
    }
  };

  // Delete income
  const deleteIncome = async (id: string) => {
    try {
      await axiosInstance.delete(`${API_PATHS.INCOME.DELETE_INCOME}/${id}`);
      setIncomeData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log("Failed to delete income", error);
    }
  };

  // Handle download income details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        { responseType: "blob" }
      );
      // handle file download logic here
    } catch (error) {
      console.log("Failed to download income details", error);
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
