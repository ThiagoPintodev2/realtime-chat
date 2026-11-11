import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'token não fornecido'
    })
  }

  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não configurado no .env");
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido ou expirado'
    });
  }
}

export default authMiddleware;