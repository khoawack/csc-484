"use client";

import { X } from "lucide-react";
import { useState } from "react";

type TableNumberModalProps = {
  isOpen: boolean;
  currentTableNumber?: number;
  onSave: (tableNumber: number | null) => void;
  onClose: () => void;
};

export default function TableNumberModal({
  isOpen,
  currentTableNumber,
  onSave,
  onClose,
}: TableNumberModalProps) {
  const initialValue = currentTableNumber != null ? String(currentTableNumber) : "";
  const [tableNumber, setTableNumber] = useState(initialValue);

  if (!isOpen) return null;

  const handleSave = () => {
    const num = tableNumber.trim();
    if (num === "") {
      onSave(null);
      onClose();
    } else if (!isNaN(Number(num))) {
      onSave(Number(num));
      onClose();
    }
  };

  const handleClose = () => {
    setTableNumber(initialValue);
    onClose();
  };

  const canSave = true;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-6"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-sm w-full overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 active:scale-95 transition"
            aria-label="Close"
          >
            <X size={20} className="text-black" />
          </button>

          <h2 className="text-xl font-bold text-black mb-2">
            Table Number
          </h2>

          <p className="text-sm text-black/60 mb-6">
            Update your current table location (leave empty to clear)
          </p>

          <input
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            placeholder="Enter table number"
            type="number"
            autoFocus
            className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-base outline-none focus:ring-2 focus:ring-black/10 mb-6"
          />

          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-black font-medium transition active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!canSave}
              className={[
                "flex-1 py-3 rounded-xl font-medium transition active:scale-[0.98]",
                canSave
                  ? "bg-black text-white hover:bg-black/90"
                  : "bg-gray-300 text-black/40 cursor-not-allowed",
              ].join(" ")}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
