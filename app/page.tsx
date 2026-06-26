"use client";
console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/ui/Header";
import SearchBar from "@/components/ui/SearchBar";
import FilterChips from "@/components/ui/FilterChips";
import OutfitCard from "@/components/outfit/OutfitCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { filters } from "@/lib/data/filters";
import { supabase } from "@/lib/data/supabase";

type Outfit = {
  id: string;
  title: string;
  creator: string;
  filters: string[];
  tags: string[];
  image_url: string;
  likes: number;
  saves: number;
  description: string;
  featured: boolean;
};

export default function Discover() {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadOutfits() {
      const { data, error } = await supabase
        .from("outfits")
        .select("*")
        .order("created_at", { ascending: false });

        if (error) {
          console.error("Supabase error:", error.message);
          alert(error.message);
          return;
        }

      setOutfits(data || []);
    }

    loadOutfits();
  }, []);

  const filteredOutfits = useMemo(() => {
    return outfits.filter((outfit) => {
      const outfitFilters = Array.isArray(outfit.filters)
  ? outfit.filters
  : String(outfit.filters || "")
      .split(",")
      .map((item) => item.trim());

const outfitTags = Array.isArray(outfit.tags)
  ? outfit.tags
  : String(outfit.tags || "")
      .split(",")
      .map((item) => item.trim());

const matchesFilter =
  selectedFilter === "All" || outfitFilters.includes(selectedFilter);

const searchText = `${outfit.title} ${outfit.description} ${outfitTags.join(
  " "
)} ${outfitFilters.join(" ")}`.toLowerCase();

      return matchesFilter && searchText.includes(search.toLowerCase());
    });
  }, [outfits, selectedFilter, search]);

  function saveOutfit(outfit: Outfit) {
    const saved = JSON.parse(localStorage.getItem("tyle-saved") || "[]");

    const alreadySaved = saved.some((item: Outfit) => item.id === outfit.id);

    if (!alreadySaved) {
      localStorage.setItem("tyle-saved", JSON.stringify([...saved, outfit]));
    }
  }

  return (
    <main className="min-h-screen bg-black pb-28 text-white">
      <section className="mx-auto max-w-6xl px-5 py-6 md:px-8">
        <Header />

        <section className="py-12">
          <SectionTitle
            overline="Discover"
            title="Find your next outfit."
            subtitle="Search, filter, save and create your own version with TYLE."
          />
        </section>

        <SearchBar value={search} onChange={setSearch} />

        <FilterChips
          filters={filters}
          selected={selectedFilter}
          onSelect={setSelectedFilter}
        />

        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">
              {selectedFilter === "All" ? "All outfits" : selectedFilter}
            </p>
            <h3 className="mt-2 text-3xl font-black">
              {filteredOutfits.length} looks
            </h3>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredOutfits.map((outfit) => (
            <OutfitCard
              key={outfit.id}
              outfit={{
                id: Number(outfit.id),
                title: outfit.title,
                creator: outfit.creator,
                filters: Array.isArray(outfit.filters)
    ? outfit.filters
    : String(outfit.filters || "")
        .replace(/[{}]/g, "")
        .split(",")
        .map((s) => s.trim()),
  tags: Array.isArray(outfit.tags)
    ? outfit.tags
    : String(outfit.tags || "")
        .replace(/[{}]/g, "")
        .split(",")
        .map((s) => s.trim()),
                image: outfit.image_url,
                emoji: "✨",
                likes: String(outfit.likes),
                description: outfit.description,
              }}
              onSave={() => saveOutfit(outfit)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}