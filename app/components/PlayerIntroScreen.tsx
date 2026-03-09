"use client";

import Navbar from "./Navbar";
import { useAppFlow, type Player } from "../context/AppFlowContext";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import PlayerDetailModal from "./PlayerDetailModal";

function PlayerCard({ 
  player,
  isSelf,
  onDeleteClick,
  onClick,
}: { 
  player: Player;
  isSelf: boolean;
  onDeleteClick: () => void;
  onClick: () => void;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 flex gap-3 items-start cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]" onClick={onClick}>
      <div className="w-16 shrink-0">
        <div className="aspect-square w-16 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5">
          <img
            src={player.picture || "https://via.placeholder.com/300x300.png?text=No+Photo"}
            alt={`Profile picture of ${player.name}`}
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      </div>

      <div className="flex-1 pt-1">
        <h3 className="text-[15px] font-semibold leading-snug text-black">
          {player.name}
        </h3>
        <p className="mt-1 text-sm leading-snug text-black/70">
          {player.username}
        </p>
      </div>

      {isSelf && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick();
          }}
          className="p-2 rounded-lg hover:bg-black/5 active:scale-[0.98] transition"
          aria-label="Delete your profile"
          title="Delete your profile"
        >
          <Trash2 size={18} className="text-black/50" />
        </button>
      )}
    </div>
  );
}

export default function PlayerIntroScreen() {
  const { navigate, players, selfPlayerId, deleteSelfPlayer, toast } = useAppFlow();
  const [showModal, setShowModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleDelete = () => {
    deleteSelfPlayer();
    setShowModal(false);
  };

  return (
    <div className="h-screen bg-bg-main text-black flex flex-col screen-transition overflow-hidden">
      <Navbar />
      {toast && (
        <div className="px-8 pt-2 fixed top-6 left-0 right-0 flex justify-center z-50">
          <div className="rounded-xl bg-black/80 text-white text-sm px-4 py-3 shadow-sm animate-slideDown">
            {toast}
          </div>
        </div>
      )}
      <div className="px-8 pt-6 flex flex-col flex-1 overflow-hidden">
        <h2 className="text-2xl font-semibold leading-snug mb-6">
          Player List
        </h2>

        <p className="text-lg font-semibold text-black mb-1">Cosmic Heroes:</p>
        <p className="text-gray-700 mb-6">Saturday One Piece TCG Locals</p>

        {/* list with fade gradient */}
        <div className="relative flex-1 min-h-0 mb-6">
          <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-hide space-y-4 pr-2 pb-20">
            {players.map((player) => {
              const isSelf = selfPlayerId === player.id;
              return (
                <PlayerCard
                  key={player.id}
                  player={player}
                  isSelf={isSelf}
                  onDeleteClick={() => setShowModal(true)}
                  onClick={() => setSelectedPlayer(player)}
                />
              );
            })}
          </div>
          {/* fade gradient overlay - only show if 4+ players */}
          {players.length >= 4 && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg-main to-transparent pointer-events-none"></div>
          )}
        </div>
        
        <button
          onClick={() => navigate("introduce")}
          className="w-full text-base bg-gray-300 hover:bg-gray-400 transition active:scale-[0.98] py-3 rounded-xl text-center mx-auto mb-6"
        >
          {selfPlayerId ? "Edit information" : "Introduce Yourself"}
        </button>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        title="Delete Profile?"
        message="Are you sure you want to delete your profile from the player list?"
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
      />

      <PlayerDetailModal
        isOpen={selectedPlayer !== null}
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />
    </div>
  );
}