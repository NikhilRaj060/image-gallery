import type { ImagesResult } from "@/image/Image";
import { ImageSchemaWithPhoto } from "@/image/Image";
import env from "./env";

export default async function fetchImages(
  url: string
): Promise<ImagesResult | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY,
      },
    });
    if (!res.ok) throw new Error("Error in fetching Image!\n");

    const imagesResult: ImagesResult = await res.json();

    //Parse Data using zod schema

    const parsedData = ImageSchemaWithPhoto.parse(imagesResult);

    if (parsedData.total_results === 0) return undefined;
    return parsedData;
  } catch (e) {
    // Will show in terminal console
    if (e instanceof Error) console.log(e.stack);
  }
}
