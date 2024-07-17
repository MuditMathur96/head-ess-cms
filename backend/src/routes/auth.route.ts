import {Router} from 'express';
import AuthController from '@app/controllers/auth.controller';
import { authMiddleware } from '@app/middlewares/auth.middleware';

const router= Router();

router.post("/register",AuthController.register);
router.post("/login",AuthController.login);
router.get("/me",authMiddleware,AuthController.userDetails);

export default router;