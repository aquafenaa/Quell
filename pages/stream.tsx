import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { TwitchEmbed } from 'react-twitch-embed';

import AddStream from '../components/AddStream';

const IP = '150.136.140.99';
const PORT = '8080';

export default function Stream() {
  const router = useRouter();
  const { twitchChannel, youtubeSearch } = router.query;

  const [youtubeVideoID, setData] = React.useState('');

  useEffect(() => {
    const callData = async () => {
      if (router.isReady) {
        const data = (await fetch(`http://${IP}:${PORT}/?name=${youtubeSearch}`).then((ID) => ID.json())).body;
        setData(data);
      }
    };

    callData();
  }, [router.isReady]);

  if (youtubeVideoID === '') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AddStream />
      <TwitchEmbed channel={twitchChannel as string} autoplay withChat darkMode height={700} width="100%" />
      <iframe width="560" height="315" src={`https://www.youtube.com/embed/${youtubeVideoID as string}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen />
      <iframe width="560" height="315" src={`https://www.youtube.com/live_chat?v=${youtubeVideoID as string}&embed_domain=localhost`} title="YouTube chat" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
    </div>
  );
}
