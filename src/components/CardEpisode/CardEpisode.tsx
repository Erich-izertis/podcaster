// @ts-ignore
import Linkify from 'react-linkify';
import Card from "antd/es/card";
import Divider from "antd/es/divider";
import AudioPlayer from "../AudioPlayer/AudioPlayer.tsx";

interface CardEpisodeProps {
  url: string
  title: string
  description: string
}

export default function CardEpisode (props: CardEpisodeProps): JSX.Element{
  const { title, description, url } = props

  return (
    <Card>
      <h3 className='text-xl font-semibold mb-2'>{title}</h3>
      <p>
        <Linkify>{description}</Linkify>
      </p>
      <Divider/>
      <AudioPlayer url={url} />
    </Card>
  )
}