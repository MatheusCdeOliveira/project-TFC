import * as jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.JWT_SECRET || 'minhasenha';

const jwtConfig: jwt.SignOptions = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const generateToken = (email: string): string => jwt.sign({ email }, TOKEN_SECRET, jwtConfig);

export default generateToken;
