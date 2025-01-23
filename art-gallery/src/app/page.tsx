import { getArtworks } from "@/utils/apiUtils";
import ArtWithDetails from "@/components/ArtWithDetails";
import { processNullValues } from "@/utils/utils";
import FeaturedArtworks from "@/components/FeaturedArtworks";

const Home = async () => {
  const featuredArtworks = processNullValues(await getArtworks(6, 1, true));
  const latestArtworks = processNullValues(await getArtworks(5, 2, false));

  return (
    <div className={"minDimensions bg-background xPadding yPadding"}>
      <FeaturedArtworks artworks={featuredArtworks} />
      <h1 className={"text-large font-bold"}>Newly Added</h1>
      <p>Freshly arrived and ready to inspire.</p>
      <ArtWithDetails artworks={latestArtworks} />
    </div>
  );
};
export default Home;
