import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { occasion } = await req.json();

    const response = await client.responses.create({
      model: "gpt-5.4-mini",
      input: `
You are TYLE, an elite AI menswear stylist for young men.

Create ONE complete outfit recommendation for this occasion:

Occasion: ${occasion}

Rules:
- Create a stylish, wearable outfit.
- Do not ask for budget, style, colour, body type, or brands.
- You choose the best aesthetic.
- Include top, bottom, shoes, and one accessory.
- Do not mention specific brands yet.
- Use spendLevel instead of exact prices.
- spendLevel must be one of: "Budget-friendly", "Mid-range", "Premium".
- Keep the explanation short.
- Return ONLY valid JSON.

Format:
{
  "fit": {
    "name": "Fit name",
    "tags": ["tag 1", "tag 2", "tag 3"],
    "items": [
      {
        "name": "Item name",
        "detail": "Short detail"
      }
    ],
    "why": "Short explanation of why this outfit works.",
    "spendLevel": "Mid-range",
    "imagePrompt": "A detailed full-body editorial fashion photo prompt for this outfit."
  }
}
`,
    });

    const text = response.output_text;
    const data = JSON.parse(text);

    return Response.json(data);
  } catch (error) {
    console.error("Generate fit error:", error);

    return Response.json(
      { error: "Failed to generate outfit" },
      { status: 500 }
    );
  }
}