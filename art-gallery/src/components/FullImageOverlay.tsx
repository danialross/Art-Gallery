import { createPortal } from "react-dom";
import Image from "next/image";
import { ImCross } from "react-icons/im";
import { MdOutlineFileDownload } from "react-icons/md";
import { Dispatch, HTMLProps, SetStateAction, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { downloadImage } from "@/utils/utils";

type FullImageOverlayProps = {
  url: string;
  image_id: string;
  className: string;
  visibilitySetter: Dispatch<SetStateAction<boolean>>;
  visibility: boolean;
} & HTMLProps<HTMLDivElement>;

export default function FullImageOverlay({
  url,
  image_id,
  visibility,
  visibilitySetter,
  className,
}: FullImageOverlayProps) {
  useEffect(() => {
    const preventTouchMove = (e: TouchEvent) => e.preventDefault();
    if (visibility) {
      document.body.style.overflowY = "hidden";
      document.body.addEventListener("touchmove", preventTouchMove, {
        passive: false,
      });
    }
    return () => {
      document.body.style.overflowY = "auto";
      document.body.removeEventListener("touchmove", preventTouchMove);
    };
  }, [visibility]);
  return createPortal(
    <div
      className={`fixed top-0 left-0 w-screen h-screen backdrop-blur flex flex-col justify-center items-center gap-8 ${className}`}
    >
      <button
        onClick={() => {
          visibilitySetter(false);
        }}
      >
        <ImCross
          className={"absolute top-12 right-12 icon-grow-effect"}
          size={20}
        />
      </button>
      <div className={"flex justify-center icon-grow-effect"}>
        <Button onClick={() => downloadImage(url, image_id)}>
          <MdOutlineFileDownload size={25} /> Download
        </Button>
      </div>
      <div className={"relative w-4/5 h-4/5"}>
        <Image
          src={url}
          alt={"artwork"}
          className={"rounded-lg object-contain"}
          fill
        />
      </div>
    </div>,
    document.body,
  );
}
