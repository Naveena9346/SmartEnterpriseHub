import { Response, NextFunction } from 'express';
import { InventoryService } from './inventory.service';
import { ResponseUtils } from '../../utils/response';
import { AuthenticatedRequest } from '../../middleware/auth.middleware';

export class InventoryController {
  private inventoryService = new InventoryService();

  public getProducts = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const search = req.query.search as string;
      const result = await this.inventoryService.getProducts(req.user!.orgId, search);
      ResponseUtils.success(res, result, 'Products catalog retrieved');
    } catch (error) {
      next(error);
    }
  };

  public getWarehouses = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.inventoryService.getWarehouses(req.user!.orgId);
      ResponseUtils.success(res, result, 'Warehouses list retrieved');
    } catch (error) {
      next(error);
    }
  };

  public getPurchaseOrders = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.inventoryService.getPurchaseOrders(req.user!.orgId);
      ResponseUtils.success(res, result, 'Purchase orders retrieved');
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.inventoryService.createProduct(req.user!.orgId, req.body);
      ResponseUtils.created(res, result, 'Product created in inventory catalog');
    } catch (error) {
      next(error);
    }
  };
}
