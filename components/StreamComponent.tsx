import React from 'react';
import Image from 'next/image';

import style from '../styles/stream-component.module.css';

interface StreamProps {
  id: string;
  twitchChannel: boolean;
  onToggle: (id: string) => void;
  onChannelChange: (id: string, value: string) => void;
  removeStream: (id: string) => void;
}

export default function AddStream(props: StreamProps) {
  const {
    id, twitchChannel, onToggle, onChannelChange, removeStream,
  } = props;

  const [isTwitchChannel, setIsTwitchChannel] = React.useState<boolean>(twitchChannel);

  function toggleStreamType() {
    onToggle(id);
    setIsTwitchChannel(!isTwitchChannel);
  }

  function handleToggleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleStreamType();
    }
  }

  function handleRemoveKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      removeStream(id);
    }
  }

  function handleChannelChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChannelChange(id, event.target.value);
  }

  function handleRemove() {
    removeStream(id);
  }
  return (
    <div className={style.stream_component}>
      <div id={style.title}>{`${twitchChannel ? 'Twitch' : 'Youtube'} Stream`}</div>
      <div className={style.stream_input_box}>
        <input placeholder={`${twitchChannel ? 'Twitch' : 'YouTube'} Channel`} className={style.stream_input} type="text" onChange={handleChannelChange} />
      </div>
      <div className={style.selector}>
        <Image
          className={style.logo}
          src="/youtube-icon.svg"
          alt="YouTube logo"
          id={style.youtube_logo}
          width={35}
          height={24}
        />
        <div role="button" className={style.switch} onKeyDown={handleToggleKeyDown} onClick={toggleStreamType} tabIndex={0}>
          <input type="checkbox" id={`switch-${id}`} checked={twitchChannel} />
          <span className={style.slider} />
        </div>
        <Image
          className={style.logo}
          src="/twitch-icon.svg"
          alt="Twitch logo"
          id={style.twitch_logo}
          width={24}
          height={24}
        />
      </div>
      <div className={style.exit} role="button" onKeyDown={handleRemoveKeyDown} onClick={handleRemove} tabIndex={0} title="Remove this stream">
        <span className={style.button} aria-hidden>&times;</span>
      </div>
    </div>
  );
}
