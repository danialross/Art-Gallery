import { getArtworkUsingId } from "@/utils/apiUtils";
import SingleArtwork from "@/components/SingleArtwork";

type ArtworkPageProps = {
  params: {
    id: string;
  };
};

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { id } = await params;
  const artwork = await getArtworkUsingId(id);
  return (
    <div className={`minDimensions bg-background xPadding yPadding`}>
      <SingleArtwork artwork={artwork} />
    </div>
  );
}
