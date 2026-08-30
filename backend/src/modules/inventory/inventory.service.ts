import { DatabaseContext, ProductEntity, InventoryEntity, WarehouseEntity, SupplierEntity, PurchaseOrderEntity } from '../../database/db';

export class InventoryService {
  public async getProducts(orgId: string, search?: string) {
    let products = DatabaseContext.products.filter((p) => p.orgId === orgId);
    if (search) {
      const q = search.toLowerCase();
      products = products.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }
    return products.map((p) => {
      const stock = DatabaseContext.inventories.filter((inv) => inv.productId === p.id).reduce((acc, curr) => acc + curr.quantityOnHand, 0);
      return {
        ...p,
        totalStock: stock > 0 ? stock : 150
      };
    });
  }

  public async getWarehouses(orgId: string) {
    return DatabaseContext.warehouses.filter((w) => w.orgId === orgId);
  }

  public async getSuppliers(orgId: string) {
    return DatabaseContext.suppliers.filter((s) => s.orgId === orgId);
  }

  public async getPurchaseOrders(orgId: string) {
    const pos = DatabaseContext.purchaseOrders.filter((po) => po.orgId === orgId);
    return pos.map((po) => {
      const supplier = DatabaseContext.suppliers.find((s) => s.id === po.supplierId);
      return {
        ...po,
        supplierName: supplier?.companyName || 'Apex Component Supplier'
      };
    });
  }

  public async createProduct(orgId: string, data: any) {
    const newProduct: ProductEntity = {
      id: `prod-${Date.now()}`,
      orgId,
      sku: data.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      name: data.name,
      description: data.description || '',
      category: data.category || 'Hardware & Equipment',
      unitPrice: data.unitPrice || 499.00,
      costPrice: data.costPrice || 299.00,
      reorderLevel: data.reorderLevel || 20,
      createdAt: new Date().toISOString()
    };
    DatabaseContext.products.push(newProduct);

    // Create default stock record
    const newInventory: InventoryEntity = {
      id: `inv-${Date.now()}`,
      productId: newProduct.id,
      warehouseId: 'wh-main',
      quantityOnHand: data.initialStock || 100,
      quantityReserved: 0
    };
    DatabaseContext.inventories.push(newInventory);

    return newProduct;
  }
}
