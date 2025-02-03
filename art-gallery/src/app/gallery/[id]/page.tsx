import { getArtworkUsingId } from "@/utils/apiUtils";
import SingleArtwork from "@/components/SingleArtwork";

type ArtworkPageProps = Promise<{
  params: {
    id: string;
  };
}>;

export default async function ArtworkPage(props: { params: ArtworkPageProps }) {
  const {
    params: { id },
  } = await props.params;
  const artwork = await getArtworkUsingId(id);
  return (
    <div className={`minDimensions bg-background xPadding yPadding`}>
      <SingleArtwork artwork={artwork} />
    </div>
  );
}
