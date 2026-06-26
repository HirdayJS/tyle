"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mb-5">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search outfits..."
        className="w-full rounded-full border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-white/30"
      />
    </div>
  );
}