import { useState } from "react";
import { usePodcastsQuery } from "../services/podcastsApi";
import { Link } from "react-router-dom";

import CardPodcast from "../components/CardPodcast/CardPodcast";
import SearchBar from "../components/SearchBar/SearchBar";

export default function Home(): JSX.Element {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: podcasts, isLoading, isError } = usePodcastsQuery();
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error while fetching podcasts.</div>;
    }

    const filteredPodcasts = podcasts?.filter(
      (podcast: any) =>
        podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        podcast.artist.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
      <>
        <SearchBar onSearch={setSearchTerm} totalCount={filteredPodcasts.length} />
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(255px,1fr))] gap-4 mt-4">
          {filteredPodcasts.map((podcast: any) => (
            <li key={podcast.id} className='flex flex-col justify-center items-center mt-20'>
                <Link to={`/podcast/${podcast.id}`} className="w-full h-full">
                    <CardPodcast {...podcast} />
                </Link>
            </li>
          ))}
        </ul>
      </>
    );
};