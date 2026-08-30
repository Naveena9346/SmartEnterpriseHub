import React, { useState } from 'react';
import { Building2, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@smartenterprisehub.com');
  const [password, setPassword] = useState('Admin@123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed. Verify email and password.');
    } finally {
      setLoading(false);
    }
  };

  const quickRoles = [
    { label: 'Super Admin', email: 'admin@smartenterprisehub.com' },
    { label: 'HR Manager', email: 'hrmanager@smartenterprisehub.com' },
    { label: 'Project Manager', email: 'projmanager@smartenterprisehub.com' },
    { label: 'Team Manager', email: 'teammanager@smartenterprisehub.com' },
    { label: 'Employee', email: 'employee1@smartenterprisehub.com' },
    { label: 'Sales Manager', email: 'salesmanager@smartenterprisehub.com' },
    { label: 'Accountant', email: 'accountant@smartenterprisehub.com' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-2xl shadow-xl">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">SmartEnterpriseHub</h1>
          <p className="text-xs text-slate-400">Real-world Enterprise Management Platform</p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Corporate Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700/80 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700/80 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg text-xs shadow-lg transition flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Console'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Role Selector for Demo testing */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <p className="text-[11px] font-semibold text-slate-400 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Demo Quick Sign-In Roles:</span>
            </p>
            <div className="flex flex-wrap gap-1.5">
              {quickRoles.map((r) => (
                <button
                  key={r.email}
                  onClick={() => { setEmail(r.email); setPassword('Admin@123456'); }}
                  className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 text-[10px] text-slate-300 rounded border border-slate-700"
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
