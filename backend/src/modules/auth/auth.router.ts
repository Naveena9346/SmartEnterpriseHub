import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validateRequest } from '../../middleware/validate.middleware';
import { authenticateJwt } from '../../middleware/auth.middleware';
import { LoginSchema, RegisterSchema } from './auth.dto';

const router = Router();
const controller = new AuthController();

router.post('/login', validateRequest(LoginSchema), controller.login);
router.post('/register', validateRequest(RegisterSchema), controller.register);
router.get('/profile', authenticateJwt, controller.getProfile);

export default router;
