/* eslint-disable no-param-reassign */
import Link from 'next/link';
import React from 'react';

import { v4 as uuid } from 'uuid';

import style from '../styles/stream-component.module.css';

import StreamComponent from './StreamComponent';

interface Stream {
  id: string;
  twitchChannel: boolean;
  channel: string;
}

export default function AddStreamMenu() {
  const [streams, setStreams] = React.useState<(Stream | undefined)[]>([undefined, undefined, undefined, undefined]);

  function toggleStreamType(id: string) {
    const newStream = streams.map((strm) => {
      if (strm && strm.id === id) {
        strm.twitchChannel = !strm.twitchChannel;
        return strm;
      }

      return strm;
    });

    setStreams(newStream);
  }

  function handleChannelChange(id: string, value: string) {
    const newStream = streams.map((strm) => {
      if (strm && strm.id === id) {
        strm.channel = value;
        return strm;
      }

      return strm;
    });

    setStreams(newStream);
  }

  function addStream() {
    let hasReplaced = false;
    const newStream = streams.map((strm) => {
      if (!strm && !hasReplaced) {
        hasReplaced = true;
        return {
          id: uuid(),
          twitchChannel: false,
          channel: '',
        };
      }

      return strm;
    });

    setStreams(newStream);
  }

  function handleAddKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      addStream();
    }
  }

  function removeStream(id: string) {
    let hasReplaced = false;

    const newStream = streams.map((strm) => {
      if (strm && strm.id === id && !hasReplaced) {
        hasReplaced = true;
        return undefined;
      }

      return strm;
    });

    // shift undefineds to the end
    newStream.sort((a, b) => {
      if (a && b) {
        return 0;
      }

      if (a) {
        return -1;
      }

      if (b) {
        return 1;
      }

      return 0;
    });

    setStreams(newStream);
  }

  return (
    <div>
      <div className={style.add_stream_menu}>
        {streams.map((stream) => (
          <div className={style.stream_box}>
            {stream
              ? (
                <StreamComponent
                  twitchChannel={stream.twitchChannel}
                  id={stream.id}
                  onToggle={toggleStreamType}
                  onChannelChange={handleChannelChange}
                  removeStream={removeStream}
                />
              )
              : (
                <div
                  role="button"
                  onKeyDown={handleAddKeyDown}
                  onClick={addStream}
                  className={style.add_stream}
                  tabIndex={0}
                  title="Add a stream"
                >
                  <span className={style.button}>+</span>
                </div>
              )}
          </div>
        ))}
      </div>

      <Link href={{
        pathname: '/stream',
        query: {
          twitchChannels: streams.filter((s) => s && s.twitchChannel).map((s) => s!.channel) ?? streams.map((s) => s!.channel),
          youtubeSearches: streams.filter((s) => s && !s.twitchChannel).map((s) => s!.channel) ?? streams.map((s) => s!.channel),
        },
      }}
      >
        Submit
      </Link>
    </div>
  );
}
