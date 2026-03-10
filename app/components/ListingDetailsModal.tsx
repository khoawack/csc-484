"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { Listing } from "../context/AppFlowContext";

type Props = {
  isOpen: boolean;
  listing: Listing | null;
  onClose: () => void;
  onImageOpen?: (src: string) => void;
};

export default function ListingDetailsModal({ isOpen, listing, onClose, onImageOpen, }: Props) {
  // lock scroll behind modal
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen || !listing) return null;

  const prettyType =
    listing.type === "trade"
      ? "Trading"
      : listing.type === "sell"
      ? "Selling"
      : "Searching";

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
            type="button"
          >
            <X size={20} className="text-black" />
          </button>

          <div className="p-6">
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => onImageOpen?.(listing.image)}
                className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 shadow-md ring-1 ring-black/5 mb-4 active:scale-[0.98] transition"
                aria-label={`View full image for ${listing.name}`}
                >
                <Image
                    src={listing.image}
                    alt={`Card image of ${listing.name}`}
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                    unoptimized={listing.image.startsWith("data:")}
                />
              </button>

              <h2 className="text-2xl font-bold text-black mb-1">
                {listing.name}
              </h2>

              <p className="text-base text-black/70 mb-4">{listing.set}</p>

              {!!listing.description?.trim() && (
                <div className="w-full bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-semibold text-black/60 mb-1">
                    Notes
                  </p>
                  <p className="text-sm italic text-black/80">
                    {listing.description}
                  </p>
                </div>
              )}

              <div className="w-full bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-black/60 mb-1">
                  Listing Type
                </p>
                <p className="text-2xl font-bold text-black mb-1">
                  {prettyType}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}