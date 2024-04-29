// @ts-ignore
import Linkify from 'react-linkify';
import {useEffect} from 'react'
import {useQueryClient} from "@tanstack/react-query";
import {useParams, Outlet, Link, useNavigate} from "react-router-dom";
import Card from "antd/es/card";
import Divider from "antd/es/divider";
// helpers
import find from "lodash/find"

export default function Podcast() {
  const navigate = useNavigate();
  const { podcastId } = useParams();
  const queryClient = useQueryClient()

  const podcasts = queryClient.getQueryData(['podcasts'])

  useEffect(() => {
    if(!podcasts) navigate('/');
  }, []);

  if(!podcasts) return null

  const { id, artist, imgSrc, summary, title}: any = find(podcasts, ["id", podcastId])

  return (
    <div className='flex'>
      <div className="w-80 mr-6 flex-none">
        <Card
          bodyStyle={{paddingTop: 0}}
          cover={<Link to={`/podcast/${id}`}><img alt={title} className="mx-auto mt-6" src={imgSrc}/></Link>}>
          <Divider/>
          <Card.Meta
            title={<Link to={`/podcast/${id}`}>{title}</Link>}
            description={<Link to={`/podcast/${id}`}><i>by {artist}</i></Link>} />
          <Divider/>
          <p className='mb-2 text-base font-semibold'>Description:</p>
          <p className='overflow-hidden'>
            <Linkify>{summary}</Linkify>
          </p>
        </Card>
      </div>
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
}

