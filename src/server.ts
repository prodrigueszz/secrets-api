import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import { apiReference } from '@scalar/express-api-reference'
import secretRouter from './secrets/secrets.routes.js';
import authRouter from './lib/auth.routes.js';
import { authSchema, swaggerSpec } from './swagger.config.js';

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

app.use('/docs/auth', apiReference({
  theme: 'deepSpace',
  content: authSchema,
}))

app.use('/docs/secrets', apiReference({
  theme: 'elysiajs',
  content: swaggerSpec
}))

app.use('/api/v1/secrets', secretRouter)

app.listen(PORT, () => {
  console.log(
    `server listenning at http://127.0.0.1:${PORT}\n` +
    `auth docs at http://127.0.0.1:3333/docs/auth\n` +
    `secrets docs at http://127.0.0.1:3333/docs/secrets`
  )
})
