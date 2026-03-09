"use client";

import { ChevronLeft } from "lucide-react";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { useAppFlow } from "../context/AppFlowContext";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import TableNumberModal from "./TableNumberModal";

type NavbarProps = {
  showTableSelector?: boolean;
};

export default function Navbar({ showTableSelector = false }: NavbarProps) {
  const { goBack, screen, resetAll, getSelfPlayer, saveSelfPlayer, showToast, experience, menuStep } = useAppFlow();
  const [showModal, setShowModal] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const isRoot = screen === "welcome";
  const selfPlayer = getSelfPlayer();
  const hasProfile = selfPlayer != null;
  
  // for new users, show table button at the same time as the tooltip (menuStep >= 2)
  const shouldShowTableButton = showTableSelector && (experience === "returning" || menuStep >= 2);

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

  const handleTableNumberSave = (tableNumber: number | null) => {
    if (selfPlayer) {
      saveSelfPlayer({
        ...selfPlayer,
        tableNumber: tableNumber ?? undefined,
        tableNumberUpdatedAt: tableNumber != null ? Date.now() : undefined,
      });
    }
  };

  const handleTableNumberClick = () => {
    if (hasProfile) {
      setShowTableModal(true);
    } else {
      showToast("Please introduce yourself first to unlock this feature.");
    }
  };

  return (
    <>
      <div className="sticky top-0 z-10 bg-bg-main/80 backdrop-blur">
        <div className="h-14 flex items-center justify-between px-6">
          <div>
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
          
          {shouldShowTableButton && (
            <button
              onClick={handleTableNumberClick}
              className={[
                "p-2 rounded-lg transition active:scale-[0.98]",
                hasProfile
                  ? "hover:bg-black/5 text-black"
                  : "text-black/30",
              ].join(" ")}
              aria-label="Edit table number"
            >
              <MdOutlineTableRestaurant size={24} />
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

      <TableNumberModal
        key={showTableModal ? 'open' : 'closed'}
        isOpen={showTableModal}
        currentTableNumber={selfPlayer?.tableNumber}
        onSave={handleTableNumberSave}
        onClose={() => setShowTableModal(false)}
      />
    </>
  );
}