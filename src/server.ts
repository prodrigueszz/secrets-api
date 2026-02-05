import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import { apiReference } from '@scalar/express-api-reference'
import { authSchema, swaggerSpec } from './swagger';
import secretRouter from './secrets/secrets.routes';
import authRouter from './lib/auth.routes';


const app = express();
const PORT = process.env.PORT! || 3000;

app.use(authRouter);

app.use(
  cors({
    origin: "http://127.0.0.1:3333", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true, 
  })
);

app.use(express.json());

app.use('/docs', apiReference({
  theme: 'deepSpace',
  content: authSchema,
}))

app.use('/api/v1/secrets', secretRouter)

app.listen(PORT, () => {
  console.log(
    `server listenning at http://127.0.0.1:${PORT}\n` +
    `docs at http://127.0.0.1:3333/docs`
  )
})
