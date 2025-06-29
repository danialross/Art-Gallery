import Image from "next/image";
import { useEffect, useState } from "react";
import { getArtworksImage } from "@/utils/apiUtils";
import LoadingImage from "@/components/LoadingImage";
import FullImageOverlay from "@/components/FullImageOverlay";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

type ArtProps = {
  id: number;
  image_id: string | null;
  width: number;
  height: number;
  isNavigate?: boolean;
};

const noImage = "/no-image.png";

// parent of this component needs to have relative
const Art = ({ id, image_id, width, height, isNavigate = false }: ArtProps) => {
  const [url, setUrl] = useState<string | null>(null);
  const [showFullImage, setShowFullImage] = useState(false);
  const router = useRouter();
  const [isShowingRedirectLoader, setIsShowingRedirectLoader] = useState(false);

  const handleNavigation = () => {
    setIsShowingRedirectLoader(true);
    router.push(`/gallery/${id}`);
  };

  useEffect(() => {
    let newUrl: string;

    const getBlobFromImageId = async () => {
      if (image_id === "") {
        setUrl(noImage);
        return;
      } else if (image_id !== null) {
        const blob = await getArtworksImage(image_id);
        //check if req passed
        if (blob instanceof Blob) {
          newUrl = URL.createObjectURL(blob);
          setUrl(newUrl);
          return;
        }
      }
      setUrl(null);
    };

    getBlobFromImageId();

    return () => {
      if (newUrl && newUrl !== noImage) {
        URL.revokeObjectURL(newUrl);
      }
    };
  }, [image_id]);

  return url ? (
    <div className={"flex justify-center items-center"}>
      <FullImageOverlay
        url={url}
        image_id={image_id ? image_id : ""}
        visibility={showFullImage}
        visibilitySetter={setShowFullImage}
        className={`overlay-transition ${showFullImage ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />
      <Image
        src={url}
        alt={"artwork"}
        className={"object-contain art-grow-effect"}
        width={width}
        height={height}
        onClick={
          isNavigate && image_id
            ? handleNavigation
            : () => setShowFullImage(true)
        }
      />
      {isShowingRedirectLoader && <LoadingSpinner />}
    </div>
  ) : (
    <LoadingImage width={275} height={275} />
  );
};

export default Art;
