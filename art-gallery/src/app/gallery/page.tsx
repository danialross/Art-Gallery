import { getArtworks, getTotalArtworkPages } from "@/utils/apiUtils";
import GalleryWithPagination from "@/components/GalleryWithPagination";

const About = async () => {
  const galleryArtworks = await getArtworks(9, 1, false);
  const totalArtworkPages = await getTotalArtworkPages();
  return (
    <div className={"minDimensions bg-background xPadding yPadding space-y-8"}>
      <GalleryWithPagination
        totalNumPages={totalArtworkPages}
        galleryArtworks={galleryArtworks}
      />
    </div>
  );
};

export default About;
