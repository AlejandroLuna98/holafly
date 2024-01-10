import mongoose, { Document } from 'mongoose';

interface ICard extends Document {
  id: string;
  status: 'Expired' | 'Pending' | 'Active';
  dateStart: Date;
  dateEnd: Date | null;
  consumption: {
    totalConsumption: number | null;
  } | null;
  flag: string;
  country: string;
  plan: string;
  userId: mongoose.Schema.Types.ObjectId;
}
const cardSchema = new mongoose.Schema({
  status: { type: String, required: true },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, default: null },
  consumption: {
    totalConsumption: { type: Number, default: null },
  },
  flag: { type: String, required: true },
  country: { type: String, required: true },
  plan: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export const Card = mongoose.model<ICard>('Card', cardSchema);
