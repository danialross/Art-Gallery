import { getArtworks } from "@/utils/apiUtils";
import { processNullValues } from "@/utils/utils";
import FeaturedArtworks from "@/components/FeaturedArtworks";
import NewlyAddedArtworks from "@/components/NewlyAddedArtworks";

const Home = async () => {
  const featuredArtworks = processNullValues(await getArtworks(6, 1, true));
  const latestArtworks = processNullValues(await getArtworks(5, 2, false));
  return (
    <div className={"minDimensions bg-background xPadding yPadding"}>
      <FeaturedArtworks artworks={featuredArtworks} />
      <NewlyAddedArtworks artworks={latestArtworks} />
    </div>
  );
};
export default Home;
