import React, { useEffect, useState } from 'react';
import { Settings, Shield, Building, Key, Bell, Globe } from 'lucide-react';
import { apiClient } from '../services/api';

export const SettingsPage: React.FC = () => {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/settings')
      .then((res) => setConfig(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          <span>System Administration & Platform Settings</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Configure global organization parameters, security policy, currency & notifications</p>
      </div>

      {loading ? (
        <div className="text-slate-400 text-xs text-center p-8">Loading settings...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Organization Settings */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 pb-3 border-b border-slate-800">
              <Building className="w-4 h-4 text-cyan-400" />
              <span>Corporate Organization Setup</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Organization Name</span>
                <span className="font-semibold text-white">{config?.organizationName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Org Code</span>
                <span className="font-mono text-cyan-400">{config?.orgCode}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Primary Domain</span>
                <span className="font-semibold">{config?.domain}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Default Currency</span>
                <span className="font-semibold text-emerald-400">{config?.settings?.currency || 'USD ($)'}</span>
              </div>
            </div>
          </div>

          {/* Security & Authentication Policy */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 pb-3 border-b border-slate-800">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Security & Identity Governance</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Multi-Factor Auth (MFA)</span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                  Enforced
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">JWT Token Expiry</span>
                <span className="font-mono text-slate-200">24 Hours</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Password Expiry Cycle</span>
                <span className="font-semibold">{config?.securityPolicy?.passwordExpiryDays || 90} Days</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Session Idle Timeout</span>
                <span className="font-semibold">{config?.securityPolicy?.sessionTimeoutMinutes || 30} Minutes</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
