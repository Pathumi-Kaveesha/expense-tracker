import React from "react";

interface DeleteAlertProps {
  content: string;
  onDelete: () => void;
  onCancel: () => void; // Added onCancel
}

const DeleteAlert: React.FC<DeleteAlertProps> = ({
  content,
  onDelete,
  onCancel,
}) => {
  return (
    <div>
      <p className="text-sm">{content}</p>
      <div className="flex justify-end mt-6 gap-2">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={onDelete}
        >
          Delete
        </button>
        <button type="button" className="add-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
