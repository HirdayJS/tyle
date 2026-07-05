import { searchProducts } from "@/lib/data/searchProducts";

export async function POST(req: Request) {
  try {
    const start = Date.now();
    const { item } = await req.json();

    const query = [
      item.colour,
      item.fit,
      item.material,
      item.name,
      "men",
      "Australia",
    ]
      .filter(Boolean)
      .join(" ");

    const products = await searchProducts(query);
    console.log(`${item.name} took ${Date.now() - start}ms`);
    return Response.json({
      id: item.id,
      products,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to find product" },
      { status: 500 }
    );
  }
}