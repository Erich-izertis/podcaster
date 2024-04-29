import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
// components
import CardEpisode from "../components/CardEpisode/CardEpisode.tsx";
// helpers
import find from "lodash/find";
import toNumber from "lodash/toNumber";

export default function Episode() {
  const queryClient = useQueryClient()
  const { podcastId, episodeId } = useParams()

  const podcast = queryClient.getQueryData(['podcastDetails', podcastId])

  if (!podcast) return <p>Error al cargar el podcast.</p>

  const track: any = find(podcast, ["trackId", toNumber(episodeId)])

  if (!track) return <p>Error al cargar el episodio del podcast.</p>

  return (
    <CardEpisode title={track.trackName} url={track.episodeUrl} description={track.description} />
  );
}
