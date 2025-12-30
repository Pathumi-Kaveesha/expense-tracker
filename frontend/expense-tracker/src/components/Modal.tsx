import React from "react";

interface ModalProps {
  children: any;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal = ({ children, isOpen, onClose, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex justify-center items-center w-full h-full overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="relative p-4 w-full max-w-2xl">
        <div className="relative bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <button
              type="button"
              className="text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-lg p-2 transition-colors"
              onClick={onClose}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1l14 14M15 1L1 15"
                />
              </svg>
            </button>
          </div>
          <div className="p-6 bg-white rounded-b-lg">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
