import { useParams } from "react-router-dom";
// components
import TableEpisodes from "../components/TableEpisodes/Table.tsx";
// services
import { usePodcastDetailsQuery } from "../services/podcastDetailsApi.ts";
// helpers
import find from "lodash/find";
import filter from "lodash/filter";

export default function Episodes() {
  const { podcastId } = useParams();
  const { data, isLoading, isError } = usePodcastDetailsQuery(podcastId||"");

  if(!podcastId) return null;
  if(isError) return <p>Error al cargar los episodios del podcast.</p>
  if(isLoading) return <p>Cargando...</p>

  const metaData = find(data, ['wrapperType', 'track']) || {}
  const episodes = filter(data, ['wrapperType', 'podcastEpisode']);

  return (
    <TableEpisodes
      data={episodes}
      total={metaData.trackCount}
      loading={isLoading} />
  )
}
