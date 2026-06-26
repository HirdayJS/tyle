"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/data/supabase";

export default function NewOutfitPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [filters, setFilters] = useState("");
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  function makeSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function uploadImage(file: File) {
    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${makeSlug(file.name)}.${fileExt}`;

    const { error } = await supabase.storage
      .from("outfits")
      .upload(fileName, file);

    if (error) {
      setUploading(false);
      alert(error.message);
      return;
    }

    const { data } = supabase.storage.from("outfits").getPublicUrl(fileName);

    setImageUrl(data.publicUrl);
    setUploading(false);
  }

  async function publishOutfit() {
    setLoading(true);

    const finalSlug = makeSlug(title);

    const { error } = await supabase.from("outfits").insert({
      title,
      slug: finalSlug,
      image_url: imageUrl,
      description,
      creator: "TYLE",
      likes: 0,
      saves: 0,
      filters: filters
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      tags: tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      featured,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="min-h-screen bg-black pb-28 text-white">
      <section className="mx-auto max-w-6xl px-5 py-8">
        <button
          onClick={() => router.push("/admin")}
          className="text-white/60 hover:text-white"
        >
          ← Back to Admin
        </button>

        <div className="mt-8">
          <h1 className="text-5xl font-black">New Outfit</h1>
          <p className="mt-3 text-white/50">
            Upload an image, add details, preview, then publish.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-4">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/40">
              Live Preview
            </p>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
              <div className="h-[560px] overflow-hidden bg-white/[0.04]">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={title || "Outfit preview"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-white/30">
                    Image preview
                  </div>
                )}
              </div>

              <div className="p-6">
                <p className="text-sm text-white/50">
                  {filters || "Filters will appear here"}
                </p>

                <h2 className="mt-1 text-4xl font-black">
                  {title || "Outfit title"}
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/60">
                  {description || "Description will appear here."}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="rounded-full border border-white/10 py-3 text-sm font-bold">
                    Save
                  </button>

                  <button className="rounded-full bg-white py-3 text-sm font-black text-black">
                    Make This Mine
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                Image
              </p>

              <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/20 bg-white/[0.03] px-6 py-10 text-center hover:bg-white/[0.06]">
                <span className="text-3xl">📤</span>
                <span className="mt-3 font-bold">
                  {uploading ? "Uploading..." : "Upload outfit image"}
                </span>
                <span className="mt-2 text-sm text-white/40">
                  JPG, PNG or WEBP
                </span>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadImage(file);
                  }}
                />
              </label>
            </div>

            <div className="mt-6 grid gap-5">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 outline-none"
              />

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white/40">
                Slug: {title ? makeSlug(title) : "auto-generated"}
              </div>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={4}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 outline-none"
              />

              <input
                value={filters}
                onChange={(e) => setFilters(e.target.value)}
                placeholder="Filters: Date, Minimal, Trending"
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 outline-none"
              />

              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tags: black, coffee, night"
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 outline-none"
              />

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                Featured outfit
              </label>

              <button
                onClick={publishOutfit}
                disabled={loading || uploading || !title || !imageUrl || !description}
                className="rounded-full bg-white px-6 py-5 text-lg font-black text-black disabled:opacity-40"
              >
                {loading ? "Publishing..." : "Publish Outfit"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}