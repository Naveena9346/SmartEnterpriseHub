import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  KanbanSquare,
  GitPullRequest,
  Building2,
  Package,
  DollarSign,
  FileText,
  ShieldAlert,
  Settings,
  Users2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const navItems = [
    { label: 'Executive BI', path: '/', icon: LayoutDashboard },
    { label: 'Employees & HR', path: '/employees', icon: Users },
    { label: 'Projects Workspace', path: '/projects', icon: Briefcase },
    { label: 'Kanban & Tasks', path: '/kanban', icon: KanbanSquare },
    { label: 'Workflows & Approvals', path: '/workflows', icon: GitPullRequest },
    { label: 'CRM & Sales', path: '/crm', icon: Users2 },
    { label: 'Inventory & Supply', path: '/inventory', icon: Package },
    { label: 'Finance & Invoices', path: '/finance', icon: DollarSign },
    { label: 'Document Library', path: '/documents', icon: FileText },
    { label: 'Audit Logs', path: '/audit-logs', icon: ShieldAlert },
    { label: 'System Settings', path: '/settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-lg shadow-lg">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-white tracking-wide text-sm">SmartEnterpriseHub</h1>
          <p className="text-[11px] text-cyan-400 font-medium">Enterprise Management Platform</p>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
              }`
            }
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Footer Profile */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-white text-xs">
            {user?.firstName?.[0] || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold text-cyan-400 bg-cyan-950 border border-cyan-800 rounded">
              {user?.role}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
