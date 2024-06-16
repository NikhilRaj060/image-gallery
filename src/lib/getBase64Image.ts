import { getPlaiceholder } from "plaiceholder";
import type { Photo, ImagesResult } from "@/image/Image";

async function getBase64(imageUrl: string) {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) {
      throw new Error(
        `Failed to load image : ${imageUrl} ${res.status} ${res.statusText}`
      );
    }

    const buffer = await res.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (error) {
    if (error instanceof Error) console.log(error.stack);
  }
}

export default async function addBlurredDataUrls(
  images: ImagesResult
): Promise<Photo[]> {
  // to make request once not one by one  --- avoiding the waterfall model.
  // to get unresolved promised.
  const base64Promises = images.photos.map((photo) =>
    getBase64(photo.src.large)
  );

  // resolve promise in order

  try {
    const base64PromiseUrls = await Promise.all(base64Promises);

    const photoWithBlur: Photo[] = images.photos.map((photo, i) => {
      photo.blurreddataUrl = base64PromiseUrls[i];
      return photo;
    });
    return photoWithBlur;
  } catch (error) {
    // console.error("Error processing images:", error);
    throw error;
  }
}
