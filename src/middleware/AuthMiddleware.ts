import { NextFunction, Request, Response } from 'express';

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers.authorization as string;
    const token = authorization.split(" ")[0];

  
    if (!token) {
      return res.status(401).json({
        message: 'token-missing'
      })
    }

    next();
  } catch {
    return res.status(401).json({
      message: 'token-invalid'
    })
  }
}