export interface ICard {
  status: 'Expired' | 'Pending' | 'Active';
  dateStart: Date;
  dateEnd: Date | null;
  consumption: {
    totalConsumption: number | null;
  } | null;
  flag: string;
  country: string;
  plan: string;
  id: string;
}
