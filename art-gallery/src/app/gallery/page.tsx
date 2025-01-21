import { getArtworkUsingQuery, getTotalArtworkPages } from "@/utils/apiUtils";
import GalleryWithPagination from "@/components/GalleryWithPagination";

const About = async () => {
  const galleryArtworks = await getArtworkUsingQuery("", 1, 9);
  const totalArtworkPages = await getTotalArtworkPages();
  return (
    <div className={"minDimensions bg-background xPadding yPadding"}>
      <h1 className={"text-large mb-4 w-full"}>Gallery</h1>
      <GalleryWithPagination
        totalNumPages={totalArtworkPages}
        galleryArtworks={galleryArtworks}
      />
    </div>
  );
};

export default About;
