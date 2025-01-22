import { getArtworks, getTotalArtworkPages } from "@/utils/apiUtils";
import GalleryWithPagination from "@/components/GalleryWithPagination";

const About = async () => {
  const galleryArtworks = await getArtworks(9, 1, false);
  const totalArtworkPages = await getTotalArtworkPages();
  return (
    <div className={"minDimensions bg-background xPadding yPadding"}>
      <h1 className={"font-bold text-large mb-4 w-full"}>Gallery</h1>
      <GalleryWithPagination
        totalNumPages={totalArtworkPages}
        galleryArtworks={galleryArtworks}
      />
    </div>
  );
};

export default About;
