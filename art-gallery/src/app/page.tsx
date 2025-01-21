import { getArtworks } from "@/utils/apiUtils";
import NewlyAddedArt from "@/components/NewlyAddedArt";
import { processNullValues } from "@/utils/utils";
import FeaturedArtworks from "@/components/FeaturedArtworks";

const Home = async () => {
  const featuredArtworks = processNullValues(await getArtworks(6, 1, true));
  const latestArtworks = processNullValues(await getArtworks(5, 2, false));

  return (
    <div className={"minDimensions bg-background xPadding yPadding"}>
      <FeaturedArtworks artworks={featuredArtworks} />
      <NewlyAddedArt artworks={latestArtworks} />
    </div>
  );
};
export default Home;
