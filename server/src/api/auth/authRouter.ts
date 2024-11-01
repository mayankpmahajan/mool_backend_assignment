import express from 'express';

const authRouter = express.Router();

authRouter.post('/register', registerController);
authRouter.post('/login', loginController);
authRouter.get('/user/profile', authMiddleware,  profileController);

export default authRouter;