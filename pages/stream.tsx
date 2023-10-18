import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const IP = '150.136.140.99';
const PORT = '8080';

export default function Stream() {
  const router = useRouter();
  const { twitchChannels, youtubeSearches } = router.query;

  const [twitchStreams, setTwitchChannels] = React.useState<string[]>([]);
  const [youtubeStreams, setYoutubeChannels] = React.useState<string[]>([]);

  useEffect(() => {
    if (router.isReady) {
      const callData = async () => {
        if (twitchChannels) {
          const arr = typeof twitchChannels === 'string' ? [twitchChannels] : twitchChannels;
          setTwitchChannels(arr);
        }
        // we want to get the youtube channel ID, and not the actual channel name for the embed
        if (youtubeSearches) {
          const arr = typeof youtubeSearches === 'string' ? [youtubeSearches.replace(' ', '%20')]
            : youtubeSearches.map((search: string) => search.replace(' ', '%20'));
          const getID = async (names: string[]) => (await fetch(`http://${IP}:${PORT}/?name=${names.join(',_,')}`)).json();
          const response = (await getID(arr)).channels;

          setYoutubeChannels(await Promise.all(response));
        }
      };
      callData();
    }
  }, [router.isReady]);

  if (youtubeSearches && (!youtubeStreams || youtubeStreams.length === 0)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="streamSources">
      {twitchStreams.map((twitchChannel) => (
        <iframe className="stream twitch" width="49.5%" height="500rem" title={twitchChannel} src={`https://player.twitch.tv/?channel=${twitchChannel}&parent=localhost`} />
      ))}
      {youtubeStreams.map((youtubeStream) => (
        <iframe className="stream youtube" width="50%" height="500rem" src={`https://www.youtube.com/embed/${youtubeStream}`} title="YouTube video player" allowFullScreen />
      ))}
    </div>
  );
}
