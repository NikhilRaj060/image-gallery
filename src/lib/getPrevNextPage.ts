import { ImagesResult } from "@/image/Image";

function getPageNummber(url: string) {
  const { searchParams } = new URL(url);
  return searchParams.get("page");
}

export default function getPrevNextPages(image: ImagesResult) {
  let nextPage = image.next_page ? getPageNummber(image.next_page) : null;

  const prevPage = image.prev_page ? getPageNummber(image.prev_page) : null;
  const totalPage =
    image.total_results % image.per_page
      ? Math.ceil(image.total_results / image.per_page)
      : image.total_results / image.per_page + 1;

  if (prevPage && parseInt(prevPage) + 5 < totalPage) {
    nextPage = (parseInt(prevPage) + 5).toString();
  }
  if (nextPage && parseInt(nextPage) >= totalPage) {
    nextPage = null;
  }
  return { nextPage, prevPage, totalPage };
}
