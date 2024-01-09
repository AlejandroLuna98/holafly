import express from 'express';
import { authController } from '../controllers/authController';
import { validateJWT } from '../middleware/validateJWT';
import { userController } from '../controllers/userController';
import { cardController } from '../controllers/cardController';

const router = express.Router();

router.post('/auth', authController);
router.get('/getUser', validateJWT, userController);
router.get('/getCards', validateJWT, cardController);
export default router;
