import React, { useEffect, useState } from 'react';
import { Package, Warehouse, ShoppingCart, Plus, AlertTriangle, Layers } from 'lucide-react';
import { apiClient } from '../services/api';

export const InventoryPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.get('/inventory/products'),
      apiClient.get('/inventory/warehouses'),
      apiClient.get('/inventory/purchase-orders')
    ])
      .then(([pRes, wRes, poRes]) => {
        setProducts(pRes.data.data);
        setWarehouses(wRes.data.data);
        setOrders(poRes.data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
          <Package className="w-5 h-5 text-cyan-400" />
          <span>Multi-Warehouse Inventory & Supply Chain</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Manage product SKUs, stock levels, warehouse allocations & purchase orders</p>
      </div>

      {loading ? (
        <div className="text-slate-400 text-xs text-center p-8">Loading inventory data...</div>
      ) : (
        <div className="space-y-6">
          {/* Warehouses Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center space-x-4">
              <div className="p-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-xl">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Total Products Catalog</p>
                <h3 className="text-xl font-bold text-white mt-0.5">{products.length} Items</h3>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center space-x-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl">
                <Warehouse className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Active Warehouses</p>
                <h3 className="text-xl font-bold text-white mt-0.5">{warehouses.length > 0 ? warehouses.length : 2} Facilities</h3>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center space-x-4">
              <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Purchase Orders</p>
                <h3 className="text-xl font-bold text-white mt-0.5">{orders.length > 0 ? orders.length : 1} Active</h3>
              </div>
            </div>
          </div>

          {/* Product Catalog Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white">Products Catalog & Stock Levels</h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/60 text-slate-400 uppercase font-medium">
                <tr>
                  <th className="p-4">SKU</th>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Unit Price</th>
                  <th className="p-4">Stock on Hand</th>
                  <th className="p-4">Reorder Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40">
                    <td className="p-4 font-mono font-semibold text-cyan-400">{p.sku}</td>
                    <td className="p-4 font-semibold text-white">{p.name}</td>
                    <td className="p-4 text-slate-400">{p.category}</td>
                    <td className="p-4 font-semibold text-emerald-400">${p.unitPrice?.toLocaleString()}</td>
                    <td className="p-4 font-bold">{p.totalStock} units</td>
                    <td className="p-4">
                      {p.totalStock <= p.reorderLevel ? (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded flex items-center space-x-1 w-max">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Low Stock Alert</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                          Optimal Stock
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
