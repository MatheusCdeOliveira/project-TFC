import { NextFunction, Request, Response } from 'express';
import { authenticateToken } from '../utils/token';

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  const user = authenticateToken(token);
  if (!user) return res.status(401).json({ message: 'Token must be a valid token' });
  req.body.user = user;
  next();
};

export default authenticationMiddleware;
