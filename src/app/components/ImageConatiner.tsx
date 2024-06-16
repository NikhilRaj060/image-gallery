import type { Photo } from "@/image/Image";
import Image from "next/image";
import Link from "next/link";

type Props = {
  photo: Photo;
};

export default function ImgContainer({ photo }: Props) {
  const widthHeightRatio = photo.height / photo.width;
  const galleryHeight = Math.ceil(250 * widthHeightRatio);
  const photoSpan = Math.ceil(galleryHeight / 10) + 1;

  return (
    <div
      className="justify-self-center"
      style={{ gridRow: `span ${photoSpan}` }}
    >
      <Link href={photo.url} target={"_blank"}>
        <div className="rounded-xl overflow-hidden group">
          <Image
            src={photo.src.large}
            alt={photo.alt}
            width={250}
            height={250}
            className="transform hover:scale-125 transition duration-1000 group-hover:opacity-70"
            sizes="(min-width:1280px) 278px, (min-width:1040px) calc(12.73vw +118px), (min-width:800px) 33.18vw, (min-width:540px)
            50vw ,calc (100vw -16px)"
            blurDataURL={photo.blurreddataUrl}
            placeholder="blur"
          />
        </div>
      </Link>
    </div>
  );
}

// export default function ImgContainer({ Props }: any) {
//   return (
//     <div key={Props.id} className="h-64 bg-gray-200 rounded-xl">
//       <Image src={Props.src.large} alt={Props.alt} width={250} height={250} />
//     </div>
//   );
// }
