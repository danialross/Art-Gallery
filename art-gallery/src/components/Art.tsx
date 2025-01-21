import Image from "next/image";
import { useEffect, useState } from "react";
import { getArtworksImage } from "@/utils/apiUtils";
import LoadingImage from "@/components/LoadingImage";

type ArtProps = {
  image_id: string | null;
  width: number;
  height: number;
};

// parent of this component needs to have relative
const Art = ({ image_id, width, height }: ArtProps) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let newUrl: string;

    const getBlobFromImageId = async () => {
      if (image_id !== "") {
        const blob = await getArtworksImage(image_id);
        //check if req passed
        if (blob instanceof Blob) {
          newUrl = URL.createObjectURL(blob);
          setUrl(newUrl);
        }
      }
    };

    getBlobFromImageId();

    return () => {
      if (url) {
        URL.revokeObjectURL(newUrl);
      }
    };
  }, [image_id]);

  return url ? (
    <div className={"flex justify-center items-center"}>
      <Image
        src={url}
        alt={"artwork"}
        style={{
          objectFit: "contain",
        }}
        width={width}
        height={height}
      />
    </div>
  ) : (
    <LoadingImage width={width} height={height} />
  );
};

export default Art;
