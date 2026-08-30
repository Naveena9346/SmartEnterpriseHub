import React, { useEffect, useState } from 'react';
import { Users2, Plus, DollarSign, Tag, TrendingUp, Phone, Mail, Building } from 'lucide-react';
import { apiClient } from '../services/api';

export const CrmPage: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'customers' | 'leads'>('leads');

  useEffect(() => {
    Promise.all([apiClient.get('/crm/customers'), apiClient.get('/crm/leads')])
      .then(([cRes, lRes]) => {
        setCustomers(cRes.data.data);
        setLeads(lRes.data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <Users2 className="w-5 h-5 text-cyan-400" />
            <span>CRM & Sales Pipeline Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Track enterprise client accounts, sales funnels, lead conversions & deals</p>
        </div>

        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-1.5 font-semibold rounded-lg transition ${activeTab === 'leads' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Sales Leads ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-1.5 font-semibold rounded-lg transition ${activeTab === 'customers' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Client Directory ({customers.length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-slate-400 text-xs text-center p-8">Loading CRM data...</div>
      ) : activeTab === 'leads' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 text-[9px] font-bold text-cyan-400 bg-cyan-950 border border-cyan-800 rounded">
                    {lead.stage}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1">{lead.title}</h3>
                  <p className="text-xs text-slate-400">{lead.customerName}</p>
                </div>
                <span className="text-base font-bold text-emerald-400">${lead.estimatedValue?.toLocaleString()}</span>
              </div>

              <div className="pt-2 border-t border-slate-800/60 text-xs text-slate-400 space-y-1">
                <p>Source: <strong className="text-slate-200">{lead.source}</strong></p>
                <p>Lead Owner: <strong className="text-slate-200">{lead.assigneeName}</strong></p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/60 text-slate-400 uppercase font-medium">
              <tr>
                <th className="p-4">Company Name</th>
                <th className="p-4">Primary Contact</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Industry</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-semibold text-white">{c.companyName}</td>
                  <td className="p-4">{c.contactName}</td>
                  <td className="p-4 text-cyan-400">{c.email}</td>
                  <td className="p-4 text-slate-400">{c.phone}</td>
                  <td className="p-4">{c.industry}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
