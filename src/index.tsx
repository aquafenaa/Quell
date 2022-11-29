import React from 'react';
import ReactDOM from 'react-dom/client';
import Stream from './pages/Stream';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Stream twitchChannel="itsgng" youtubeChannel="" />
  </React.StrictMode>,
);
