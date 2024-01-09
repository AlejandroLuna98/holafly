import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';
import { connectDB } from './config/db/db';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDB();

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
