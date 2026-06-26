const fs = require("fs");
const { createClient } = require("@supabase/supabase-js");

require("dotenv").config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

function parseCSV(content) {
  const lines = content.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim());

    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });

    return row;
  });
}

async function importOutfits() {
  const csv = fs.readFileSync("outfits.csv", "utf8");
  const rows = parseCSV(csv);

  const outfits = rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    image_url: row.image_url,
    description: row.description,
    creator: row.creator || "TYLE",
    likes: Number(row.likes || 0),
    saves: Number(row.saves || 0),
    filters: row.filters.split("|").map((x) => x.trim()),
    tags: row.tags.split("|").map((x) => x.trim()),
    featured: row.featured === "true",
  }));

  const { data, error } = await supabase
  .from("outfits")
  .upsert(outfits, { onConflict: "slug" });

  if (error) {
    console.error("Import failed:", error.message);
    return;
  }

  console.log(`Imported ${outfits.length} outfits successfully.`);
}

importOutfits();