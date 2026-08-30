import { Router } from 'express';
import { FinanceController } from './finance.controller';
import { authenticateJwt } from '../../middleware/auth.middleware';

const router = Router();
const controller = new FinanceController();

router.use(authenticateJwt);

router.get('/invoices', controller.getInvoices);
router.post('/invoices', controller.createInvoice);
router.get('/expenses', controller.getExpenses);

export default router;
