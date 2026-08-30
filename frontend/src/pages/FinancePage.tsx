import React, { useEffect, useState } from 'react';
import { DollarSign, FileText, Plus, ArrowUpRight, ArrowDownRight, CreditCard } from 'lucide-react';
import { apiClient } from '../services/api';

export const FinancePage: React.FC = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'invoices' | 'expenses'>('invoices');

  useEffect(() => {
    Promise.all([apiClient.get('/finance/invoices'), apiClient.get('/finance/expenses')])
      .then(([iRes, eRes]) => {
        setInvoices(iRes.data.data);
        setExpenses(eRes.data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const totalInvoiced = invoices.reduce((acc, curr) => acc + curr.grandTotal, 0);
  const totalExpensed = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-cyan-400" />
            <span>Financial Accounting & Invoicing Console</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Manage corporate accounts, client billing invoices, tax totals & expense claims</p>
        </div>

        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-1.5 font-semibold rounded-lg transition ${activeTab === 'invoices' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Invoices ({invoices.length})
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-4 py-1.5 font-semibold rounded-lg transition ${activeTab === 'expenses' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Expense Claims ({expenses.length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-slate-400 text-xs text-center p-8">Loading financial ledger...</div>
      ) : (
        <div className="space-y-6">
          {/* Summary Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center space-x-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl">
                <ArrowUpRight className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Total Invoiced Billing</p>
                <h3 className="text-xl font-bold text-emerald-400 mt-0.5">${totalInvoiced.toLocaleString()}</h3>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center space-x-4">
              <div className="p-3 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl">
                <ArrowDownRight className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Recorded Expenses</p>
                <h3 className="text-xl font-bold text-rose-400 mt-0.5">${totalExpensed.toLocaleString()}</h3>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center space-x-4">
              <div className="p-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-xl">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Net Ledger Balance</p>
                <h3 className="text-xl font-bold text-cyan-400 mt-0.5">${(totalInvoiced - totalExpensed).toLocaleString()}</h3>
              </div>
            </div>
          </div>

          {activeTab === 'invoices' ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/60 text-slate-400 uppercase font-medium">
                  <tr>
                    <th className="p-4">Invoice #</th>
                    <th className="p-4">Client Company</th>
                    <th className="p-4">Issue Date</th>
                    <th className="p-4">Subtotal</th>
                    <th className="p-4">Tax (10%)</th>
                    <th className="p-4">Grand Total</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-800/40">
                      <td className="p-4 font-mono font-semibold text-cyan-400">{inv.invoiceNumber}</td>
                      <td className="p-4 font-semibold text-white">{inv.customerName}</td>
                      <td className="p-4 text-slate-400">{inv.issueDate}</td>
                      <td className="p-4">${inv.subtotal?.toLocaleString()}</td>
                      <td className="p-4 text-slate-400">${inv.taxTotal?.toLocaleString()}</td>
                      <td className="p-4 font-bold text-emerald-400">${inv.grandTotal?.toLocaleString()}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded">
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/60 text-slate-400 uppercase font-medium">
                  <tr>
                    <th className="p-4">Category</th>
                    <th className="p-4">Submitted By</th>
                    <th className="p-4">Expense Date</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Approval Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {expenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-800/40">
                      <td className="p-4 font-semibold text-white">{exp.category}</td>
                      <td className="p-4">{exp.employeeName}</td>
                      <td className="p-4 text-slate-400">{new Date(exp.expenseDate).toLocaleDateString()}</td>
                      <td className="p-4">{exp.description}</td>
                      <td className="p-4 font-bold text-rose-400">${exp.amount?.toLocaleString()}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded">
                          {exp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
