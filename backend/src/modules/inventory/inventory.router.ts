import { Router } from 'express';
import { InventoryController } from './inventory.controller';
import { authenticateJwt } from '../../middleware/auth.middleware';

const router = Router();
const controller = new InventoryController();

router.use(authenticateJwt);

router.get('/products', controller.getProducts);
router.post('/products', controller.createProduct);
router.get('/warehouses', controller.getWarehouses);
router.get('/purchase-orders', controller.getPurchaseOrders);

export default router;
