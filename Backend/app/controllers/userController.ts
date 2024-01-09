import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const userController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.user?.userId;
    const user = await User.findById(userId).select(['-password', '-email']);
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (e) {
    return res.status(500);
  }
};
