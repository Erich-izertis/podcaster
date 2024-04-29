import Card from "antd/es/card";

export interface CardPodcastProps {
  title: string;
  artist: string;
  imgSrc: string;
}

export default function CardPodcast(props: CardPodcastProps): JSX.Element{
  const { title, imgSrc, artist } = props

  return (
    <Card hoverable className="h-full">
      <img
        alt={title}
        className="mx-auto rounded-full mb-2 -mt-20 w-36 h-36"
        src={imgSrc}
      />
      <p className="text-center">
        <b>{title}</b> <br />
        <span>Autor: {artist}</span>
      </p>
    </Card>
  );
};