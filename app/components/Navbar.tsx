"use client";

import { ChevronLeft } from "lucide-react";
import { useAppFlow } from "../context/AppFlowContext";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

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

      <ConfirmationModal
        isOpen={showModal}
        title="Return to Main Menu?"
        message="This will reset all your data and return you to the welcome screen."
        confirmText="Reset & Exit"
        onConfirm={handleConfirm}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
}