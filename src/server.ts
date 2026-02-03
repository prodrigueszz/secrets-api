import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT! || 3000;

app.listen(PORT, () => {
  console.log(
    `server listenning at http://127.0.0.1:${PORT}\n` +
    `docs at http://127.0.0.1:3333/docs`
  )
})
