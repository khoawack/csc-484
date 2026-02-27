"use client";

import Navbar from "./Navbar";
import { useAppFlow } from "../context/AppFlowContext";

type Player = {
  id: number;
  name: string;
  username: string;
  picture: string;
};

const players: Player[] = [
  {
    id: 1,
    name: "John Doe",
    username: "snorlaxlover.123",
    picture:
      "https://i.pinimg.com/736x/f4/31/76/f43176cf062903a487363184ef571a2b.jpg",
  },
  {
    id: 2,
    name: "Jill Doe",
    username: "dittolover.234",
    picture: "https://pbs.twimg.com/media/EjXk-3kWkAAsltL.jpg",
  },
  {
    id: 3,
    name: "Jane Doe",
    username: "pikachulover.567",
    picture:
      "https://i.pinimg.com/474x/27/4b/86/274b8668ce3435062eed1fe88bec6817.jpg",
  },
];

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
  const { navigate } = useAppFlow();

  return (
    <div className="min-h-screen bg-bg-main text-black flex flex-col screen-transition">
      <Navbar />

      <div className="px-8 pt-6 relative">
        <h2 className="text-2xl font-semibold leading-snug mb-6">
          Player List
        </h2>

        <p className="text-lg font-semibold text-black mb-1">Cosmic Heroes:</p>

        <p className="text-gray-700 mb-6">Saturday One Piece TCG Locals</p>
        <div className="space-y-6">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
        <button className="w-full text-base bg-gray-300 hover:bg-gray-400 transition active:scale-[0.98] mt-8 py-3 rounded-xl text-center mx-auto">
          Introduce Yourself
        </button>
      </div>
    </div>
  );
}
