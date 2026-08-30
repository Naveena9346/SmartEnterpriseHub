import React, { useEffect, useState } from 'react';
import { Users, Briefcase, CheckSquare, DollarSign, CalendarCheck, TrendingUp, ShieldAlert, Package, UserCheck } from 'lucide-react';
import { apiClient } from '../services/api';
import { ExecutiveDashboard } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const DashboardPage: React.FC = () => {
  const [data, setData] = useState<ExecutiveDashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/analytics/dashboard')
      .then((res) => setData(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-400 text-sm animate-pulse">Loading Executive BI Dashboard...</div>;
  }

  const chartData = [
    { name: 'Revenue', amount: data?.financials.totalRevenue || 0 },
    { name: 'Expenses', amount: data?.financials.totalExpenses || 0 },
    { name: 'Net Profit', amount: data?.financials.netProfit || 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Executive Business Intelligence</h2>
          <p className="text-xs text-slate-400 mt-1">Real-time enterprise metrics, financials, projects & workforce analytics</p>
        </div>
        <div className="flex items-center space-x-2 bg-cyan-950/80 px-3 py-1.5 rounded-lg border border-cyan-800 text-cyan-400 text-xs font-semibold">
          <TrendingUp className="w-4 h-4" />
          <span>System Healthy • Live</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Employees</p>
            <h3 className="text-2xl font-bold text-white mt-1">{data?.totalEmployees}</h3>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center space-x-4">
          <div className="p-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-xl">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Active Projects</p>
            <h3 className="text-2xl font-bold text-white mt-1">{data?.activeProjects}</h3>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center space-x-4">
          <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Pending Tasks</p>
            <h3 className="text-2xl font-bold text-white mt-1">{data?.pendingTasks}</h3>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Net Profit</p>
            <h3 className="text-2xl font-bold text-emerald-400 mt-1">
              ${data?.financials.netProfit.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      {/* Analytics & Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-cyan-400" />
            <span>Financial Performance Overview</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Bar dataKey="amount" fill="#0284c7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance & Workforce Stats */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Workforce Attendance</span>
          </h3>
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-lg">
              <span className="text-xs text-slate-300">Present Today</span>
              <span className="text-xs font-bold text-emerald-400">{data?.attendanceStats.presentCount}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-lg">
              <span className="text-xs text-slate-300">Late Check-ins</span>
              <span className="text-xs font-bold text-amber-400">{data?.attendanceStats.lateCount}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-lg">
              <span className="text-xs text-slate-300">Absent / On Leave</span>
              <span className="text-xs font-bold text-rose-400">{data?.attendanceStats.absentCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log Stream */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
          <span>Real-time System Audit Stream</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/60 text-slate-400 uppercase font-medium">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Action</th>
                <th className="p-3">Entity</th>
                <th className="p-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {data?.recentAuditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30">
                  <td className="p-3 text-slate-500 font-mono text-[11px]">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="p-3 font-semibold text-cyan-400">{log.action}</td>
                  <td className="p-3">{log.entityName}</td>
                  <td className="p-3 font-mono text-slate-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
