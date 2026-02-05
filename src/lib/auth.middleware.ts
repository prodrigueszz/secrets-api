import { Request, Response, NextFunction } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from './auth.js';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionData = await  auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!sessionData) {
      return res.status(401).json({
        status: "fail",
        statusCode: 401,
        error: "Unauthorized",
        message: "Sem autorização"
      })
    }

    req.user = sessionData.user;
    req.session = sessionData.session;

    next()
  } catch (error) {
    console.error("Auth Middleware: ", error);
    return res.status(500).json({
      status: "fail",
      statusCode: 500,
      error: "Erro interno",
      message: "Falha do servidor"
    })
  }
}