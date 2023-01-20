import express from 'express';
import https from 'https';

require('dotenv').config();

const KEY = process.env.API_KEY;
const app = express();
const port = 8080;

app.get('/', async (req, res) => {
  const channelName = req.query.name as string;
  const IDs = await new Promise((resolve) => {
    https.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${channelName?.split(' ').join('%20')}&key=${KEY}`, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        const channelID = JSON.parse(data).items[0].id.channelId;
        const liveID = JSON.parse(data).items[1].id.videoId;
        resolve({
          channelID,
          liveID,
        });
      });
    });
  });

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  res.send(IDs);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Quell server started at port: ${port}!`);
});
