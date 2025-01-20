import { getFeaturedArtworks, getLatestArtworks } from "@/utils/apiUtils";
import NewlyAddedArt from "@/components/NewlyAddedArt";
import { processNullValues } from "@/utils/utils";
import FeaturedArtworks from "@/components/FeaturedArtworks";

const Home = async () => {
  const featuredArtworks = processNullValues(await getFeaturedArtworks());
  const latestArtworks = processNullValues(await getLatestArtworks(6));

  return (
    <div className={"minDimensions bg-background xPadding yPadding"}>
      <FeaturedArtworks artworks={featuredArtworks} />
      <NewlyAddedArt artworks={latestArtworks} />
    </div>
  );
};
export default Home;
