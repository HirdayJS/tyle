"use client";

import Link from "next/link";
import type { Outfit } from "@/lib/data/outfits";

type OutfitCardProps = {
  outfit: Outfit;
  onSave?: (outfit: Outfit) => void;
};

export default function OutfitCard({ outfit, onSave }: OutfitCardProps) {
  return (
    <article className="group">
      <Link href="#" className="block">
        <div className="relative h-[560px] overflow-hidden rounded-[2rem] bg-white/[0.03]">
          <img
            src={outfit.image}
            alt={outfit.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-sm font-medium text-white/70">
              {outfit.filters.slice(0, 2).join(" · ")}
            </p>

            <h2 className="mt-2 text-4xl font-black leading-none">
              {outfit.title}
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">
              {outfit.description}
            </p>
          </div>
        </div>
      </Link>

      <div className="mt-3 grid grid-cols-[1fr_1.4fr] gap-3">
        <button
          onClick={() => onSave?.(outfit)}
          className="rounded-full border border-white/10 py-3 text-sm font-bold hover:bg-white/10"
        >
          Save
        </button>

        <Link
          href="/style"
          className="rounded-full bg-white py-3 text-center text-sm font-black text-black"
        >
          Make This Mine
        </Link>
      </div>
    </article>
  );
}