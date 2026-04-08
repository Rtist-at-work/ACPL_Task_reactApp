import { useState } from "react";


const ConfirmModal = ({ isOpen, onClose, onConfirm, }) => {
  if (!isOpen) return null;

  const [loading,setLoading] = useState()

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl">
        <h2 className="text-lg font-semibold text-gray-800">
          Delete Product?
        </h2>

        <p className="text-sm text-gray-600 mt-2">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          {/* Cancel */}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>

          {/* Confirm */}
          <button
            onClick={()=>{
                setLoading(true)
                onConfirm()
            }}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;