import * as jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.JWT_SECRET || 'minhasenha';

const jwtConfig: jwt.SignOptions = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const generateToken = (email: string, role: string): string => jwt
  .sign({ email, role }, TOKEN_SECRET, jwtConfig);

export const authenticateToken = (token: string): jwt.JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    return decoded as jwt.JwtPayload;
  } catch (err) {
    return null;
  }
};

export default generateToken;
