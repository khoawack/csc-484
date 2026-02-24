"use client";

import Image from "next/image";
import { useAppFlow } from "../context/AppFlowContext";

export default function WelcomeScreen() {
  const { navigate } = useAppFlow();

  return (
    <div className="text-black px-10 pt-8 flex flex-col min-h-screen screen-transition">
      <div className="pb-4">
        <h1 className="text-3xl font-semibold pb-5">Welcome</h1>
        <h2 className="text-xl font-semibold pb-2">Cosmic Heroes:</h2>
        <p>Saturday One Piece TCG Locals</p>
      </div>

      <Image
        src="https://i.ytimg.com/vi/CPtEyY3GPVQ/hq720.jpg"
        alt="Cosmic Heroes Banner"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto rounded-xl"
      />

      <div className="pt-4 text-sm flex-grow flex flex-col">
        <p>
          <strong>Location:</strong> Orchard City
        </p>

        <p className="mt-5 mb-8">
          Join us for an exciting Saturday of One Piece TCG action at Cosmic
          Heroes! Whether you're a seasoned pirate or just starting your
          journey, our weekly locals event is the perfect place to test your
          deck, meet fellow players, and compete for prizes in a fun and
          welcoming environment.
        </p>

        <p className="mb-15">
          Get ready, trade cards, and feel comfortable before this event starts.
        </p>

        <button
          onClick={() => navigate("experience")}
          className="w-full text-base bg-gray-300 hover:bg-gray-400 transition-all duration-200 active:scale-[0.98] py-3 rounded-xl text-center mx-auto"
        >
          Start
        </button>
      </div>
    </div>
  );
}
