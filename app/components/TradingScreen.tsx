"use client";

import Navbar from "./Navbar";
import Image from "next/image";
import { useAppFlow } from "../context/AppFlowContext";
import type { Listing } from "../context/AppFlowContext";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

function CardListing({ listing }: { listing: Listing }) {
  const { removeListing } = useAppFlow();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    removeListing(listing.id);
    setShowModal(false);
  };

  return(
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 relative hover:shadow-md transition-shadow cursor-pointer">
        {/* delete button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(true);
          }}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition text-xl font-light z-10"
        >
          ×
        </button>

        <div className="flex gap-4">
          {/* card image placeholder */}
          <div className="w-24 h-24 bg-gray-100 rounded shrink-0 flex items-center justify-center overflow-hidden">
            <Image
              src={listing.image}
              alt="Card placeholder"
              width={96}
              height={96}
              className="w-full h-full object-cover"
              unoptimized={listing.image.startsWith('data:')}
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

      <ConfirmationModal
        isOpen={showModal}
        title="Remove Card?"
        message={`Are you sure you want to remove ${listing.name} from your list?`}
        confirmText="Remove"
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
      />
    </>
  )
}

export default function TradingScreen() {
  const { navigate, listings, section, setSection } = useAppFlow();

  const sectionBase = "underline underline-offset-8"

  const selectedSection = "text-black transition-all duration-150";

  const unselectedSection = "text-gray-400 transition-all duration-150";


  
  return (
    <div className="h-screen bg-bg-main text-black flex flex-col screen-transition overflow-hidden">
      <Navbar />

      <div className="px-8 pt-6 flex flex-col flex-1 overflow-hidden">
        {section === "trading" && <h2 className="text-2xl font-semibold leading-snug mb-6">Trading List</h2>}
        {section === "searching" && <h2 className="text-2xl font-semibold leading-snug mb-6">Searching List</h2>}
        {section === "selling" && <h2 className="text-2xl font-semibold leading-snug mb-6">Selling List</h2>}

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

        {/* listings with fade gradient */}
        {(() => {
          const typeMap = { trading: "trade", searching: "search", selling: "sell" } as const;
          const filtered = listings.filter(l => l.type === typeMap[section]);
          
          return (
            <div className="relative flex-1 min-h-0 mb-6">
              <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-hide pb-20">
                {filtered.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No cards up for listing yet, be the first!</p>
                ) : (
                  filtered.map(listing => <CardListing key={listing.id} listing={listing} />)
                )}
              </div>
              {/* fade gradient overlay - only show if 4+ cards */}
              {filtered.length >= 4 && (
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg-main to-transparent pointer-events-none"></div>
              )}
            </div>
          );
        })()}

        <button
          onClick={() => navigate("addCard")} 
          className="w-full text-base bg-gray-300 hover:bg-gray-400 transition active:scale-[0.98] py-3 rounded-xl text-center mx-auto mb-6">Add a card
        </button>

      </div>
    </div>
  );
}
