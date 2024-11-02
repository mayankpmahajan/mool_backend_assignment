import express, {Router} from 'express';
import { loginController, profileController, refreshController, registerController, resetPasswordsController } from './authController';
import { authMiddleware } from '../../middleware/authMiddleware';


const authRouter = Router();
authRouter.post("/register", registerController);
authRouter.post('/login', loginController);
authRouter.get('/user/profile', authMiddleware, profileController);
authRouter.get('/refreshToken', authMiddleware, refreshController);
authRouter.post('/resetPassword', authMiddleware, resetPasswordsController);

export default authRouter;