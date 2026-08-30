import { Router } from 'express';
import { DocumentController } from './document.controller';
import { authenticateJwt } from '../../middleware/auth.middleware';

const router = Router();
const controller = new DocumentController();

router.use(authenticateJwt);

router.get('/', controller.getDocuments);
router.post('/', controller.uploadDocument);

export default router;
