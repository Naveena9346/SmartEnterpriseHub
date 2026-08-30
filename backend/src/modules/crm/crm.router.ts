import { Router } from 'express';
import { CrmController } from './crm.controller';
import { authenticateJwt } from '../../middleware/auth.middleware';

const router = Router();
const controller = new CrmController();

router.use(authenticateJwt);

router.get('/customers', controller.getCustomers);
router.post('/customers', controller.createCustomer);
router.get('/leads', controller.getLeads);
router.post('/leads', controller.createLead);

export default router;
