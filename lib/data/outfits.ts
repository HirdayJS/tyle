export type Outfit = {
    id: number;
    title: string;
    creator: string;
    filters: string[];
    tags: string[];
    emoji: string;
    likes: string;
    description: string;
    image: string;
  };
  
  export const outfits: Outfit[] = [
    {
      id: 1,
      title: "Midnight Espresso",
      creator: "TYLE",
      filters: ["Date", "Minimal", "Trending"],
      tags: ["date", "minimal", "coffee", "black", "night"],
      emoji: "☕",
      likes: "12.4k",
      description: "A clean coffee-date outfit with dark tones and relaxed confidence.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Tokyo Street",
      creator: "TYLE",
      filters: ["Streetwear", "Trending"],
      tags: ["streetwear", "oversized", "black", "city"],
      emoji: "🖤",
      likes: "18.9k",
      description: "Layered streetwear with strong proportions and city energy.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Gym Clean Fit",
      creator: "TYLE",
      filters: ["Gym"],
      tags: ["gym", "athletic", "clean", "casual"],
      emoji: "🏋️",
      likes: "5.9k",
      description: "A sharp athletic look that works before and after training.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Airport Luxury",
      creator: "TYLE",
      filters: ["Travel", "Luxury"],
      tags: ["travel", "airport", "comfortable", "luxury"],
      emoji: "✈️",
      likes: "8.4k",
      description: "Comfort-first travel outfit with a premium silhouette.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Boardroom Minimal",
      creator: "TYLE",
      filters: ["Office", "Minimal"],
      tags: ["office", "work", "minimal", "smart"],
      emoji: "💼",
      likes: "10.2k",
      description: "Professional, simple and sharp without looking stiff.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Old Money Sunday",
      creator: "TYLE",
      filters: ["Old Money", "Luxury"],
      tags: ["old money", "quiet luxury", "neutral", "day out"],
      emoji: "🥂",
      likes: "7.2k",
      description: "Soft tailoring, quiet luxury and relaxed weekend polish.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 7,
      title: "After Hours",
      creator: "TYLE",
      filters: ["Trending", "Streetwear"],
      tags: ["party", "black", "night", "bold"],
      emoji: "🍸",
      likes: "13.2k",
      description: "Dark, sharp and slightly bold for late-night plans.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 8,
      title: "Summer Evening",
      creator: "TYLE",
      filters: ["Date"],
      tags: ["date", "summer", "light", "evening"],
      emoji: "🌅",
      likes: "11.7k",
      description: "Light layers and clean colours for warm evening plans.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    },
  ];