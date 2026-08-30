/**
 * SmartEnterpriseHub — PayrollCompensation Enterprise UI View
 * Domain View ID: VIEW-204
 */

import React, { useState, useEffect } from 'react';
import { Activity, Shield, CheckCircle, AlertCircle, RefreshCw, Filter, Search, Plus, Download } from 'lucide-react';

export interface PayrollCompensationUIItem {
  id: string;
  code: string;
  name: string;
  category: string;
  status: 'ACTIVE' | 'PENDING' | 'ARCHIVED';
  value: number;
  lastUpdated: string;
}

export const PayrollCompensationView: React.FC = () => {
  const [items, setItems] = useState<PayrollCompensationUIItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  useEffect(() => {
    // Seed UI view dataset
    const mockData: PayrollCompensationUIItem[] = [];
    for (let i = 1; i <= 20; i++) {
      mockData.push({
        id: `ui-payroll_compensation-${i}`,
        code: `PAYROLL_COMPENSATION-${5000 + i}`,
        name: `Enterprise PayrollCompensation Console Item #${i}`,
        category: i % 2 === 0 ? 'Core Infrastructure' : 'Operational Management',
        status: i % 4 === 0 ? 'PENDING' : 'ACTIVE',
        value: 1250 * i,
        lastUpdated: new Date().toLocaleDateString()
      });
    }
    setItems(mockData);
    setLoading(false);
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.code.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6 bg-slate-950 text-slate-100 min-h-screen">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[10px] font-bold text-cyan-400 bg-cyan-950 border border-cyan-800 rounded">
              DOM-104
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">PayrollCompensation Console</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">Enterprise management workspace for payroll compensation operations</p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-lg transition">
            <Plus className="w-4 h-4" />
            <span>Create New Entity</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter records by code or title..."
            className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      {loading ? (
        <div className="p-8 text-center text-slate-400 text-xs animate-pulse">Loading PayrollCompensation records...</div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/80 text-slate-400 uppercase font-medium">
              <tr>
                <th className="p-4">Entity Code</th>
                <th className="p-4">Item Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Valuation (USD)</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Modified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-mono font-semibold text-cyan-400">{item.code}</td>
                  <td className="p-4 font-semibold text-white">{item.name}</td>
                  <td className="p-4 text-slate-400">{item.category}</td>
                  <td className="p-4 font-bold text-emerald-400">${item.value.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${
                      item.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{item.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export const PayrollCompensationWidget1: React.FC<{ title: string; value: number }> = ({ title, value }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
      <span className="text-[11px] text-slate-400 font-medium">{title} Widget 1</span>
      <h4 className="text-lg font-bold text-cyan-400">${value.toLocaleString()}</h4>
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${(value % 100)}%` }} />
      </div>
    </div>
  );
};

export const PayrollCompensationWidget2: React.FC<{ title: string; value: number }> = ({ title, value }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
      <span className="text-[11px] text-slate-400 font-medium">{title} Widget 2</span>
      <h4 className="text-lg font-bold text-cyan-400">${value.toLocaleString()}</h4>
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${(value % 100)}%` }} />
      </div>
    </div>
  );
};

export const PayrollCompensationWidget3: React.FC<{ title: string; value: number }> = ({ title, value }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
      <span className="text-[11px] text-slate-400 font-medium">{title} Widget 3</span>
      <h4 className="text-lg font-bold text-cyan-400">${value.toLocaleString()}</h4>
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${(value % 100)}%` }} />
      </div>
    </div>
  );
};

export const PayrollCompensationWidget4: React.FC<{ title: string; value: number }> = ({ title, value }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
      <span className="text-[11px] text-slate-400 font-medium">{title} Widget 4</span>
      <h4 className="text-lg font-bold text-cyan-400">${value.toLocaleString()}</h4>
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${(value % 100)}%` }} />
      </div>
    </div>
  );
};

export const PayrollCompensationWidget5: React.FC<{ title: string; value: number }> = ({ title, value }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
      <span className="text-[11px] text-slate-400 font-medium">{title} Widget 5</span>
      <h4 className="text-lg font-bold text-cyan-400">${value.toLocaleString()}</h4>
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${(value % 100)}%` }} />
      </div>
    </div>
  );
};
