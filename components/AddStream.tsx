import Link from 'next/link';
import React from 'react';

export default function AddStream() {
  const [twitchChannel, setTwitchChannel] = React.useState('');
  const [youtubeSearch, setYoutubeChannel] = React.useState('');

  const handleTwitchChannelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTwitchChannel(event.target.value);
  };

  const handleYoutubeChannelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeChannel(event.target.value);
  };

  return (
    <div>
      <h1>Add Stream</h1>
      <form>
        <label htmlFor="twitchChannel">
          Twitch Channel
          <input type="text" id="twitchChannel" onChange={handleTwitchChannelChange} />
        </label>
        <label htmlFor="youtubeSearch">
          YouTube Channel
          <input type="text" id="youtubeSearch" onChange={handleYoutubeChannelChange} />
        </label>
        <Link href={{
          pathname: '/stream',
          query: {
            twitchChannel,
            youtubeSearch,
          },
        }}
        >
          Submit
        </Link>
      </form>
    </div>
  );
}
