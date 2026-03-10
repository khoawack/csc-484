"use client";

import { CheckSquare, User, ClipboardList } from "lucide-react";
import Navbar from "./Navbar";
import { useAppFlow } from "../context/AppFlowContext";

export default function MainMenuScreen() {
  const { experience, menuStep, unlock, navigate, toast, hasSeenTableTooltip, dismissTableTooltip } = useAppFlow();

  const isReturning = experience === "returning";
  const shouldShowTableTooltip = experience === "new" && menuStep >= 2 && !hasSeenTableTooltip;

  const cardBase =
    "w-full rounded-2xl p-5 flex items-center gap-4 transition-all duration-200 active:scale-[0.98]";

  const enabledCard = "bg-gray-200 hover:bg-gray-300 cursor-pointer";

  const disabledCard = "bg-gray-200 opacity-50 cursor-not-allowed";

  return (
    <div className="min-h-screen bg-bg-main text-black flex flex-col screen-transition">
      <Navbar showTableSelector={true} />
      
      {toast && (
        <div className="fixed top-16 left-0 right-0 px-8 z-50 pointer-events-none">
          <div className="max-w-sm mx-auto">
            <div className="rounded-xl bg-black text-white text-sm px-4 py-3 shadow-sm animate-slideDown pointer-events-auto">
              {toast}
            </div>
          </div>
        </div>
      )}

      {shouldShowTableTooltip && (
        <div className="fixed top-16 left-0 right-0 px-8 z-50">
          <div className="max-w-sm mx-auto">
            <div 
              onClick={dismissTableTooltip}
              className="bg-blue-600 text-white text-sm px-4 py-3 rounded-2xl shadow-lg relative animate-slideDown cursor-pointer"
            >
              <div className="absolute -top-2 right-6 w-4 h-4 bg-blue-600 transform rotate-45"></div>
              <p className="font-medium mb-1">💡 Quick Tip!</p>
              <p>Use the table icon here to set your table number or edit it in your introduction page.</p>
              <p className="text-xs mt-2 opacity-80">Tap to dismiss</p>
            </div>
          </div>
        </div>
      )}

      <div className="px-8 pt-4">
        {/* header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Pre-Event Hub</h1>

          {isReturning && (
            <p className="text-sm text-gray-600 italic">
              Start wherever feels helpful
            </p>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold">Cosmic Heroes :</h2>
          <p className="text-gray-700">Saturday One Piece TCG Locals</p>
        </div>

        {/* menu wrap */}
        <div className="space-y-6 mt-6">
          {/* check in */}
          <button
            className={`${cardBase} ${
              isReturning || menuStep >= 0 ? enabledCard : disabledCard
            }`}
            disabled={!isReturning && menuStep < 0}
            onClick={() => {
                unlock(1)
                navigate("checkIn")}}
          >
            <CheckSquare size={28} strokeWidth={1.8} />
            <div className="text-left">
              <p className="font-medium">How to Check in</p>
              <p className="text-sm text-gray-600 italic">
                learn how official check-in works
              </p>
            </div>
          </button>

          {/* players */}
          <button
            className={`${cardBase} ${
              isReturning || menuStep >= 1 ? enabledCard : disabledCard
            }`}
            disabled={!isReturning && menuStep < 1}
            onClick ={ () =>{
                unlock(2)
                navigate("playerIntro")
            }
            }
          >
            <User size={28} strokeWidth={1.8} />
            <div className="text-left">
              <p className="font-medium">Meet the other players</p>
              <p className="text-sm text-gray-600 italic">introduce yourself</p>
            </div>
          </button>

          {/* trade list */}
          <button
            className={`${cardBase} ${
              isReturning || menuStep >= 2 ? enabledCard : disabledCard
            }`}
            disabled={!isReturning && menuStep < 2}
            onClick ={ () =>{
                navigate("trading")
            }}
          >
            <ClipboardList size={28} strokeWidth={1.8} />
            <div className="text-left">
              <p className="font-medium">Trading List</p>
              <p className="text-sm text-gray-600 italic">
                track cards you're seeking or trading
              </p>
            </div>
          </button>
        </div>

        {/* footer */}
        <div className="mt-12 text-xs text-gray-600 italic leading-relaxed">
          <p>You'll switch to BandaiTCG+ once the event begins.</p>
          <p>Feel free to come back to show others your trading list.</p>
        </div>
      </div>
    </div>
  );
}
