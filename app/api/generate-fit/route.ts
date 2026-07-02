import { searchProducts } from "@/lib/data/searchProducts";
import OpenAI from "openai";
import { FASHION_BRAIN } from "@/lib/data/ai/fashionBrain";
import { TYLE_LIBRARY } from "@/lib/data/ai/tyleLibrary";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
      const { prompt } = await req.json();
  
      const response = await client.responses.create({
        model: "gpt-5.4-mini",
        input: `
  ${FASHION_BRAIN}
  
  TYLE LIBRARY:
  ${JSON.stringify(TYLE_LIBRARY, null, 2)}
  
  Rules:
  - You must compose the outfit using item types from the TYLE Library.
  - You may choose colours only from the colour list.
  - You can decide material, fit, texture, and styling details.
  - Do not invent item types outside the library.
  - Create ONE outfit.
  - The outfit should feel modern, wearable, and easy to recreate.
  - imagePrompt must describe a premium flat-lay outfit board.
  - The image must show only clothing pieces.
  - No person.
  - No model.
  - No face.
  - No body.
  - Clean black or neutral background.
  - Each clothing item clearly visible.
  
  User Request:
  ${prompt}
  
  Return ONLY valid JSON.
  `,
      });
  
      const text = response.output_text;
      const data = JSON.parse(text);

      const productSearches = await Promise.all(
        data.fit.items.map(async (item: any) => {
          const query = `${item.name} men's clothing Australia`;
      
          const products = await searchProducts(query);
      
          return {
            ...item,
            products,
          };
        })
      );
      
      data.fit.items = productSearches;
      data.fit.imageUrl = null;
  
      // const image = await client.images.generate({
      //   model: "gpt-image-1",
      //   prompt: data.fit.imagePrompt,
      //   size: "1024x1536",
      // });
  
      // const imageBase64 = image.data?.[0]?.b64_json;
  
      // data.fit.imageUrl = imageBase64
      //   ? `data:image/png;base64,${imageBase64}`
      //   : null;
  
      return Response.json(data);
    } catch (error) {
      console.error("Generate fit error:", error);
  
      return Response.json(
        { error: "Failed to generate outfit" },
        { status: 500 }
      );
    }
  }