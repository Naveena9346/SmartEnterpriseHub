import React from 'react';
import { Bell, LogOut, Search, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-10">
      {/* Global Search Bar */}
      <div className="relative w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search employees, projects, tasks, invoices..."
          className="w-full pl-9 pr-4 py-1.5 bg-slate-800/80 border border-slate-700/60 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
        />
      </div>

      {/* Action Controls */}
      <div className="flex items-center space-x-4">
        {/* Role Badge */}
        <div className="flex items-center space-x-2 px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-[11px]">{user?.role}</span>
        </div>

        {/* Notifications Button */}
        <button className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
        </button>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-medium transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
};
