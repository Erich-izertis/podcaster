interface ReducedObject {
    id: string;
    title: string;
    artist: string;
    imgSrc: string;
    summary: string;
}

interface Entry {
    id: { attributes: { 'im:id': string } };
    title: { label: string };
    summary: { label: string };
    "im:image": { label: string }[];
    "im:artist": { label: string };
}

interface Feed {
    entry: Entry[];
}

export function transformFeed(feed: Feed): ReducedObject[] {
    return feed.entry.map((entry: Entry) => ({
        id: entry.id.attributes['im:id'],
        title: entry.title.label,
        artist: entry["im:artist"].label,
        imgSrc: entry["im:image"][entry["im:image"].length - 1].label,
        summary: entry.summary.label
    }));
}  