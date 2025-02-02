import { getArtworkByImageId } from "@/utils/apiUtils";
import SingleArtwork from "@/components/SingleArtwork";

type ArtworkPageProps = {
  params: {
    image_id: string;
  };
};

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { image_id } = await params;
  const artwork = await getArtworkByImageId(image_id);
  return (
    <div className={`minDimensions bg-background xPadding yPadding`}>
      <SingleArtwork artwork={artwork} />
    </div>
  );
}
