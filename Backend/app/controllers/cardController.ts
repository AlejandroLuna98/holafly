import { Request, Response } from 'express';
import { Card } from '../models/Card';
import mongoose from 'mongoose';

export const cardController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.user?.userId;

    const cards = await Card.find({ userId: userId });
    if (!cards)
      return res.status(404).json({ message: 'User does not have data' });
    return res.json(cards);
  } catch (e) {
    return res.status(500).json({ message: 'Error' });
  }
};
