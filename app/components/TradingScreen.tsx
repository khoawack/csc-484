"use client";

import Navbar from "./Navbar";
import Image from "next/image";
import { useAppFlow } from "../context/AppFlowContext";
import type { Listing } from "../context/AppFlowContext";

function CardListing({ listing }: { listing: Listing }) {
  const { removeListing } = useAppFlow();

  return(
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 relative hover:shadow-md transition-shadow cursor-pointer">
      {/* delete button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          removeListing(listing.id);
        }}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition text-xl font-light z-10"
      >
        ×
      </button>

      <div className="flex gap-4">
        {/* card image placeholder */}
        <div className="w-24 h-24 bg-gray-100 rounded shrink-0 flex items-center justify-center overflow-hidden">
          <Image
            src="https://www.svgrepo.com/show/451667/image-missing.svg"
            alt="Card placeholder"
            width={64}
            height={64}
            className="opacity-30"
          />
        </div>

        {/* card info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate pr-6">{listing.name}</h3>
          <p className="text-sm text-gray-600 truncate">Set: {listing.set}</p>
          <p className="text-sm text-gray-500 truncate">{listing.description}</p>
        </div>
      </div>
    </div>
  )
}

export default function TradingScreen() {
  const { navigate, listings, section, setSection } = useAppFlow();

  const sectionBase = "underline underline-offset-8"

  const selectedSection = "text-black transition-all duration-150";

  const unselectedSection = "text-gray-400 transition-all duration-150";


  
  return (
    <div className="min-h-screen bg-bg-main text-black flex flex-col screen-transition">
      <Navbar />

      <div className="px-8 pt-6">
        {section === "trading" && <h2 className="text-2xl font-semibold leading-snug mb-6">Trading List</h2>}
        {section === "searching" && <h2 className="text-2xl font-semibold leading-snug mb-6">Searching List</h2>}
        {section === "selling" && <h2 className="text-2xl font-semibold leading-snug mb-6">Selling List</h2>}
    
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Cosmic Heroes :</h2>
          <p className="text-gray-700">Saturday One Piece TCG Locals</p>
        </div>

        <div className="grid grid-cols-3 mb-6">
          <button 
            onClick={() => setSection("trading")}
            className={`${sectionBase} ${section === "trading" ? selectedSection : unselectedSection}`}
          >
            Trading
          </button>
          <button 
            onClick={() => setSection("searching")}
            className={`${sectionBase} ${section === "searching" ? selectedSection : unselectedSection}`}
          >
            Searching
          </button>
          <button
            onClick={() => setSection("selling")}
            className={`${sectionBase} ${section === "selling" ? selectedSection : unselectedSection}`}
          >
            Selling
          </button>
        </div>

        {/* listings */}
        <div className="mb-8 max-h-[420px] overflow-y-auto overflow-x-hidden scrollbar-hide">
          {(() => {
            const typeMap = { trading: "trade", searching: "search", selling: "sell" } as const;
            const filtered = listings.filter(l => l.type === typeMap[section]);
            
            return filtered.length === 0 ? (
              <p className="text-gray-500 text-center py-8">start adding cards!</p>
            ) : (
              filtered.map(listing => <CardListing key={listing.id} listing={listing} />)
            );
          })()}
        </div>

        <button
          onClick={() => navigate("addCard")} 
          className="w-full text-base bg-gray-300 hover:bg-gray-400 transition active:scale-[0.98] mt-8 py-3 rounded-xl text-center mx-auto">Add a card
        </button>

      </div>
    </div>
  );
}
