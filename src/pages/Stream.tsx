import React from 'react';
import { TwitchEmbed } from 'react-twitch-embed';

const IP = '150.136.140.99';
const PORT = '8080';

interface StreamProps {
  twitchChannel: string;
  youtubeChannel: string;
}

interface StreamState {
  twitchChannel: string;
  youtubeChannel: string;
  youtubeVideoId: string;
}

// eslint-disable-next-line max-len
async function getYoutubeChannelID(channelName: string): Promise<{ channelID: string, liveID: string }> {
  const req = new XMLHttpRequest();
  return new Promise((res, rej) => {
    req.open(
      'GET',
      `http://${IP}:${PORT}/?name=${channelName}`,
      true,
    );
    req.send();
    req.addEventListener('load', () => {
      res(JSON.parse(req.responseText));
    });
    req.onerror = rej;
  });
}

export default class Stream extends React.Component<StreamProps, StreamState> {
  twitchBox: string = '';

  youtubeBox: string = '';

  constructor(props: StreamProps) {
    super(props);
    this.state = {
      twitchChannel: props.twitchChannel,
      youtubeChannel: props.youtubeChannel,
      youtubeVideoId: '',
    };

    this.handleTwitchChange = this.handleTwitchChange.bind(this);
    this.handleYouTubeChange = this.handleYouTubeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTwitchChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.twitchBox = event.target.value;
  }

  handleYouTubeChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.youtubeBox = event.target.value;
  }

  async handleSubmit(event: any) {
    event.preventDefault();
    const IDs = await getYoutubeChannelID(this.youtubeBox);

    this.setState({
      twitchChannel: this.twitchBox,
      youtubeChannel: IDs.channelID,
      youtubeVideoId: IDs.liveID,
    });
  }

  render() {
    const { twitchChannel, youtubeChannel, youtubeVideoId } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="twitchChannelInput">
            Twitch Channel:
            <input id="twitchChannelInput" type="text" onChange={this.handleTwitchChange} />
          </label>
          <label htmlFor="youtubeChannelInput">
            YouTube Channel:
            <input id="youtubeChannelInput" type="text" onChange={this.handleYouTubeChange} />
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </form>
        <TwitchEmbed channel={twitchChannel} autoplay withChat darkMode height={700} width="100%" />
        <iframe width="560" height="315" src={`https://www.youtube.com/embed/live_stream?channel=${youtubeChannel}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen />
        <iframe width="560" height="315" src={`https://www.youtube.com/live_chat?v=${youtubeVideoId}&embed_domain=localhost`} title="YouTube chat" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>

    );
  }
}
