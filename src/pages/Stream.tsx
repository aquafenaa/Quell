import React from 'react';
import { TwitchEmbed } from 'react-twitch-embed';

interface StreamProps {
  twitchChannel: string;
  youtubeChannel: string;
}

interface StreamState {
  // twitchEnabled: boolean;
  // youTubeEnabled: boolean;

  twitchChannel: string;
  youtubeChannel: string;
  youtubeVideoId: string;
}

export default class Stream extends React.Component<StreamProps, StreamState> {
  twitchBox: string = '';

  youtubeBox: string = '';

  constructor(props: StreamProps) {
    super(props);
    this.state = {
      // twitchEnabled: true,
      // youTubeEnabled: true,
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

  handleSubmit(event: any) {
    this.setState({
      twitchChannel: this.twitchBox,
      youtubeChannel: this.youtubeBox,
    });

    event.preventDefault();
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
          {/* <div onClick={this.handleSubmit}>Submit</div> */}
        </form>
        <TwitchEmbed channel={twitchChannel} autoplay withChat darkMode height={700} width="100%" />
        <iframe width="560" height="315" src={`https://www.youtube.com/embed/live_stream?channel=${youtubeChannel}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen />
        <iframe width="560" height="315" src={`https://www.youtube.com/live_chat?v=${youtubeVideoId}&embed_domain=localhost`} title="YouTube chat" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>

    );
  }
}
