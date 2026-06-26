"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/data/supabase";

type Outfit = {
  id: string;
  slug: string;
  title: string;
  creator: string;
  filters: string[] | string;
  tags: string[] | string;
  image_url: string;
  likes: number;
  saves: number;
  description: string;
  featured: boolean;
};

export default function AdminPage() {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadOutfits();
  }, []);

  async function loadOutfits() {
    const { data, error } = await supabase
      .from("outfits")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setOutfits(data || []);
  }

  const filteredOutfits = useMemo(() => {
    return outfits.filter((outfit) =>
      outfit.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [outfits, search]);

  const totalLikes = outfits.reduce(
    (sum, outfit) => sum + Number(outfit.likes || 0),
    0
  );

  const featuredCount = outfits.filter((outfit) => outfit.featured).length;

  return (
    <main className="min-h-screen bg-black pb-28 text-white">
      <section className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black">TYLE Admin</h1>
            <p className="mt-3 text-white/50">Manage your outfit library.</p>
          </div>

          <Link
            href="/admin/new"
            className="rounded-full bg-white px-6 py-4 font-black text-black"
          >
            + New Outfit
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-white/40">Outfits</p>
            <h2 className="mt-2 text-4xl font-black">{outfits.length}</h2>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-white/40">Featured</p>
            <h2 className="mt-2 text-4xl font-black">{featuredCount}</h2>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-white/40">Total Likes</p>
            <h2 className="mt-2 text-4xl font-black">{totalLikes}</h2>
          </div>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search outfits..."
          className="mt-10 w-full rounded-full border border-white/10 bg-white/[0.03] px-5 py-4 outline-none placeholder:text-white/30"
        />

        <div className="mt-8 space-y-4">
          {filteredOutfits.map((outfit) => (
            <div
              key={outfit.id}
              className="flex items-center gap-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-4"
            >
              <img
                src={outfit.image_url}
                alt={outfit.title}
                className="h-24 w-24 rounded-2xl object-cover"
              />

              <div className="flex-1">
                <h3 className="text-xl font-black">{outfit.title}</h3>
                <p className="mt-1 text-sm text-white/50">
                  {Array.isArray(outfit.filters)
                    ? outfit.filters.join(" · ")
                    : outfit.filters}
                </p>
                <p className="mt-1 text-sm text-white/40">
                  ❤️ {outfit.likes || 0} · 📌 {outfit.saves || 0}
                </p>
              </div>

              {outfit.featured && (
                <span className="rounded-full border border-purple-400/30 bg-purple-400/10 px-4 py-2 text-sm text-purple-300">
                  Featured
                </span>
              )}

              <button className="rounded-full border border-white/10 px-5 py-3 text-sm hover:bg-white/10">
                Edit
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}