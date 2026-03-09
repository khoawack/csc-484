"use client";

import { type Player } from "../context/AppFlowContext";
import { X } from "lucide-react";

type PlayerDetailModalProps = {
  isOpen: boolean;
  player: Player | null;
  onClose: () => void;
};

export default function PlayerDetailModal({
  isOpen,
  player,
  onClose,
}: PlayerDetailModalProps) {
  if (!isOpen || !player) return null;

  const formatLastUpdated = (timestamp: number | undefined) => {
    if (!timestamp) return null;
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined 
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-sm w-full overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 active:scale-95 transition z-10"
            aria-label="Close"
          >
            <X size={20} className="text-black" />
          </button>

          <div className="p-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 shadow-md ring-1 ring-black/5 mb-4">
                <img
                  src={player.picture || "https://via.placeholder.com/300x300.png?text=No+Photo"}
                  alt={`Profile picture of ${player.name}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>

              <h2 className="text-2xl font-bold text-black mb-1">
                {player.name}
              </h2>

              <p className="text-base text-black/70 mb-4">
                {player.username}
              </p>

              {player.funFact && (
                <div className="w-full bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-semibold text-black/60 mb-1">
                    Fun Fact
                  </p>
                  <p className="text-sm italic text-black/80">
                    {player.funFact}
                  </p>
                </div>
              )}

              {player.tableNumber != null && (
                <div className="w-full bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-black/60 mb-1">
                    Table Number
                  </p>
                  <p className="text-2xl font-bold text-black mb-1">
                    {player.tableNumber}
                  </p>
                  {player.tableNumberUpdatedAt && (
                    <p className="text-xs text-black/50">
                      Last updated {formatLastUpdated(player.tableNumberUpdatedAt)}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
