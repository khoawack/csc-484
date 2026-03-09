"use client";

import { ChevronLeft } from "lucide-react";
import { useAppFlow } from "../context/AppFlowContext";
import { useState } from "react";

export default function Navbar() {
  const { goBack, screen, resetAll } = useAppFlow();
  const [showModal, setShowModal] = useState(false);
  const isRoot = screen === "welcome";

  const handleBackClick = () => {
    if (screen === "mainMenu") {
      setShowModal(true);
    } else {
      goBack();
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    resetAll();
  };

  return (
    <>
      <div className="sticky top-0 z-10 bg-bg-main/80 backdrop-blur">
        <div className="h-14 flex items-center px-6">
          {!isRoot && (
            <button
              onClick={handleBackClick}
              className="p-2 -ml-2 rounded-full transition active:scale-[0.98] hover:bg-black/5"
              aria-label="Back"
            >
              <ChevronLeft size={26} strokeWidth={2} />
            </button>
          )}
        </div>
        <div className="h-px bg-black/5" />
      </div>

      {/* confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-8">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-xl font-semibold mb-3">Return to Main Menu?</h3>
            <p className="text-gray-600 mb-6">
              This will reset all your data and return you to the welcome screen.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 rounded-xl font-medium transition active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition active:scale-[0.98]"
              >
                Reset & Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}