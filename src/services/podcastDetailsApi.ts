import { useQuery } from '@tanstack/react-query';

async function fetchPodcastDetails(podcastId: string) {
  const response = await fetch(
    `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=500`
  );
  const data = await response.json();
  return data.results;
}

export function usePodcastDetailsQuery(podcastId: string) {
  return useQuery({
    queryFn: () => fetchPodcastDetails(podcastId),
    queryKey: ['podcastDetails', podcastId]
  })
}
