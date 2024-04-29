import { useQuery } from '@tanstack/react-query';
import { transformFeed } from './podcastsReducer';

export const url = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

async function fetchPodcasts() {
  const response = await fetch(url);
  const data = await response.json();
  return transformFeed(data.feed)
}

export function usePodcastsQuery() {
  return useQuery({
    queryFn: fetchPodcasts,
    queryKey: ['podcasts']
  })
}
