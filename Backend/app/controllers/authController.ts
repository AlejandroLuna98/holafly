import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

export const authController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'User or password invalid' });

    if (!user.isActive)
      return res.status(401).json({ message: 'User or password invalid' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Usuario o contraseña invalido' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT as string, {
      expiresIn: '1h',
    });
    return res.json({ message: 'Ok', token });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Error', e });
  }
};
