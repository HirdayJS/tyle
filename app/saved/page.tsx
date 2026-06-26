"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Outfit = {
  title: string;
  vibe: string;
  emoji: string;
  likes: string;
  description: string;
};

export default function Saved() {
  const [saved, setSaved] = useState<Outfit[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tyle-saved") || "[]");
    setSaved(stored);
  }, []);

  function removeOutfit(title: string) {
    const updated = saved.filter((item) => item.title !== title);
    setSaved(updated);
    localStorage.setItem("tyle-saved", JSON.stringify(updated));
  }

  return (
    <main className="min-h-screen bg-black pb-28 text-white">
      <section className="mx-auto max-w-6xl px-5 py-8">
        <h1 className="text-3xl font-black">Saved</h1>
        <p className="mt-3 text-white/50">Your saved fits appear here.</p>

        {saved.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
            <p className="text-white/60">No saved fits yet.</p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-white px-5 py-3 font-bold text-black"
            >
              Discover fits
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {saved.map((outfit) => (
              <article
                key={outfit.title}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
              >
                <div className="flex h-72 items-center justify-center bg-gradient-to-br from-white/15 to-white/[0.02]">
                  <div className="text-7xl">{outfit.emoji}</div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-white/50">{outfit.vibe}</p>
                  <h2 className="mt-1 text-2xl font-black">{outfit.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    {outfit.description}
                  </p>

                  <button
                    onClick={() => removeOutfit(outfit.title)}
                    className="mt-6 rounded-full border border-white/10 px-5 py-3 text-sm hover:bg-white/10"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}