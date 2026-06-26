"use client";

type FilterChipsProps = {
  filters: string[];
  selected: string;
  onSelect: (filter: string) => void;
};

export default function FilterChips({
  filters,
  selected,
  onSelect,
}: FilterChipsProps) {
  return (
    <div className="mb-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => {
        const active = selected === filter;

        return (
          <button
            key={filter}
            onClick={() => onSelect(filter)}
            className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-semibold transition ${
              active
                ? "bg-white text-black"
                : "border border-white/10 bg-white/[0.03] text-white hover:bg-white/10"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}