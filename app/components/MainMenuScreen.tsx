"use client";

import { CheckSquare, User, ClipboardList } from "lucide-react";
import Navbar from "./Navbar";
import { useAppFlow } from "../context/AppFlowContext";

export default function MainMenuScreen() {
  const { experience, menuStep, unlock, navigate } = useAppFlow();

  const isReturning = experience === "returning";

  const cardBase =
    "w-full rounded-2xl p-5 flex items-center gap-4 transition-all duration-200 active:scale-[0.98]";

  const enabledCard = "bg-gray-200 hover:bg-gray-300 cursor-pointer";

  const disabledCard = "bg-gray-200 opacity-50 cursor-not-allowed";

  return (
    <div className="min-h-screen bg-bg-main text-black flex flex-col screen-transition">
      <Navbar />

      <div className="px-8 pt-4">
        {/* header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Pre-Event Guide</h1>

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
          <p>You’ll switch to BandaiTCG+ once the event begins.</p>
          <p>Feel free to come back to show others your trading list.</p>
        </div>
      </div>
    </div>
  );
}
