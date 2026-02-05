import { toNodeHandler } from 'better-auth/node';
import { Request, Response, Router } from 'express'
import { auth } from './auth.js'

const authRouter = Router();

authRouter.all("/api/auth/*splat", toNodeHandler(auth));

export default authRouter;
