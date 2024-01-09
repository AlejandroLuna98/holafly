import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const validateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.status(401).json({
      message: 'Unauthorized token',
    });

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT as string
    ) as jwt.JwtPayload;
    req.user = verified;
    next();
  } catch (e) {
    res.status(400).json({ message: 'Invalid Token', e });
  }
};
