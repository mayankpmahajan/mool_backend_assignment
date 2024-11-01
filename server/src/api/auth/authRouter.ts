import express, {Router} from 'express';
import { registerController } from './authController';

const authRouter = Router();
authRouter.post("/register", registerController);
// authRouter.post('/login', loginController);
// authRouter.get('/user/profile', authMiddleware,  profileController);

export default authRouter;