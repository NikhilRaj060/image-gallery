import fetchImages from "@/lib/fetchImage";
import type { ImagesResult } from "@/image/Image";
import ImgContainer from "./ImageConatiner";
import addBlurredDataUrls from "@/lib/getBase64Image";

import React from "react";
import getPrevNextPages from "@/lib/getPrevNextPage";
import Footer from "./Footer";

type Props = {
  topic?: string | undefined;
  page?: string | undefined;
};

export default async function Gallery({ topic = "curated", page }: Props) {
  debugger;
  // const url = !topic
  //   ? "https://api.pexels.com/v1/curated"
  //   : `https://api.pexels.com/v1/search?query=${topic}`;

  let url;
  if (topic === "curated" && page) {
    url = `https://api.pexels.com/v1/curated?page=${page}&per_page=70`; // browsing beyond home
  } else if (topic === "curated") {
    //Home
    url = "https://api.pexels.com/v1/curated";
  } else if (!page) {
    // First page of result
    url = `https://api.pexels.com/v1/search?query=${topic}&per_page=70`;
  } else {
    //serach result beyond page
    url = `https://api.pexels.com/v1/search?query=${topic}&page=${page}&per_page=70`;
  }
  const images: ImagesResult | undefined = await fetchImages(url);

  if (!images || images.per_page === 0) {
    return <h2 className="m-4 text-2xl font-bold">No Images Found!!!</h2>;
  }

  const photoswithBlurred = await addBlurredDataUrls(images);

  //calculate pagination.
  const { prevPage, nextPage } = getPrevNextPages(images);
  const footerProps = { topic, page, nextPage, prevPage };

  return (
    <>
      <section className="px- my-2 grid grid-cols-gallery auto-rows-[10px]">
        {photoswithBlurred.map((photo) => (
          <ImgContainer key={photo.id} photo={photo} />
        ))}
      </section>
      <Footer {...footerProps} />
    </>
  );
}
