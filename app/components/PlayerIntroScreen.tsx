"use client";

import Navbar from "./Navbar";
import { useAppFlow, type Player } from "../context/AppFlowContext";

function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="flex gap-4">
      <div className="w-[92px] shrink-0">
        <div className="aspect-square w-[92px] overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
          <img
            src={player.picture}
            alt={`Profile picture of ${player.name}`}
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      </div>

      <div className="pt-1">
        <h3 className="text-[15px] font-semibold leading-snug text-black">
          {player.name}
        </h3>
        <p className="mt-1 text-sm leading-snug text-black/70">
          {player.username}
        </p>
      </div>
    </div>
  );
}

export default function PlayerIntroScreen() {
  const { navigate, players, selfPlayerId } = useAppFlow();

  return (
    <div className="min-h-screen bg-bg-main text-black flex flex-col screen-transition">
      <Navbar />
      <div className="px-8 pt-6 flex flex-col flex-1">
        <h2 className="text-2xl font-semibold leading-snug mb-6">
          Player List
        </h2>

        <p className="text-lg font-semibold text-black mb-1">Cosmic Heroes:</p>
        <p className="text-gray-700 mb-6">Saturday One Piece TCG Locals</p>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
        
        <div className="pt-6 pb-6">
          <button
            onClick={() => navigate("introduce")}
            className="w-full text-base bg-gray-300 hover:bg-gray-400 transition active:scale-[0.98] py-3 rounded-xl text-center mx-auto"
          >
            {selfPlayerId ? "Edit information" : "Introduce Yourself"}
          </button>
        </div>
      </div>
    </div>
  );
}