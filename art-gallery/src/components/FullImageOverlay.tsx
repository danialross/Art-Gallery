import { createPortal } from "react-dom";
import Image from "next/image";
import { ImCross } from "react-icons/im";
import { MdOutlineFileDownload } from "react-icons/md";
import { Dispatch, HTMLProps, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { downloadImage } from "@/utils/utils";

type FullImageOverlayProps = {
  url: string;
  image_id: string;
  className: string;
  visibilitySetter: Dispatch<SetStateAction<boolean>>;
} & HTMLProps<HTMLDivElement>;

export default function FullImageOverlay({
  url,
  image_id,
  visibilitySetter,
  className,
}: FullImageOverlayProps) {
  return createPortal(
    <div
      className={`fixed top-0 left-0 w-screen h-screen backdrop-blur flex flex-col justify-center items-center gap-8 ${className}`}
    >
      <button
        onClick={() => {
          visibilitySetter(false);
        }}
      >
        <ImCross className={"absolute top-5 right-5"} size={20} />
      </button>
      <div className={"flex justify-center"}>
        <Button onClick={() => downloadImage(url, image_id)}>
          <MdOutlineFileDownload size={25} /> Download
        </Button>
      </div>
      <div className={"relative w-4/5 h-4/5"}>
        <Image
          src={url}
          alt={"artwork"}
          className={"fixed rounded-lg object-contain"}
          layout="fill"
        />
      </div>
    </div>,
    document.body,
  );
}
