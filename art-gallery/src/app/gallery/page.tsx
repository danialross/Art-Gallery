import { getArtworks, getTotalArtworkPages } from "@/utils/apiUtils";
import GalleryWithPagination from "@/components/GalleryWithPagination";

const About = async () => {
  const galleryArtworks = await getArtworks(9, 1, false);
  const totalArtworkPages = await getTotalArtworkPages();
  return (
    <div className={"minDimensions bg-background xPadding yPadding space-y-8"}>
      <div>
        <h1 className={"font-bold text-large w-full"}>Gallery</h1>
        <p>
          Step into a world of creativity and self-expression, where every piece
          has a story to tell. Our curated collection features art that sparks
          emotion, inspires conversation, and transforms spaces. Explore,
          discover, and let each work of art connect with you in a meaningful
          way.
        </p>
      </div>
      <GalleryWithPagination
        totalNumPages={totalArtworkPages}
        galleryArtworks={galleryArtworks}
      />
    </div>
  );
};

export default About;
