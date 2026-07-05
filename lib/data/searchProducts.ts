export type ProductResult = {
    title: string;
    price?: string;
    source?: string;
    thumbnail?: string;
    link?: string;
  };
  
  export async function searchProducts(query: string): Promise<ProductResult[]> {
    const apiKey = process.env.SERPAPI_API_KEY;
  
    if (!apiKey) {
      throw new Error("Missing SERPAPI_API_KEY");
    }
  
    const url = new URL("https://serpapi.com/search.json");
    url.searchParams.set("engine", "google_shopping");
    url.searchParams.set("q", query);
    url.searchParams.set("gl", "au");
    url.searchParams.set("hl", "en");
    url.searchParams.set("api_key", apiKey);
  
    const res = await fetch(url.toString());
  
    if (!res.ok) {
      throw new Error(`SerpAPI failed: ${res.status}`);
    }
  
    const data = await res.json();
  
    return (data.shopping_results || []).slice(0, 1).map((item: any) => ({
      title: item.title,
      price: item.price,
      source: item.source,
      thumbnail: item.thumbnail,
      link: item.link || item.product_link,
    }));
  }