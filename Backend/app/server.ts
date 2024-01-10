import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routes';
import { connectDB } from './config/db/db';

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
}));

connectDB();

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
