import React, { useEffect, useState } from 'react';
import { ShieldAlert, Search, RefreshCw, Terminal } from 'lucide-react';
import { apiClient } from '../services/api';

export const AuditLogPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/audit-logs');
      setLogs(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const filteredLogs = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.entityName.toLowerCase().includes(search.toLowerCase()) ||
      l.ipAddress.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            <span>Immutable System Audit Log Stream</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Real-time audit trail capturing user actions, security events, IP addresses & payload mutations</p>
        </div>

        <button
          onClick={fetchAuditLogs}
          className="flex items-center space-x-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Stream</span>
        </button>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter audit entries by action, entity or IP..."
          className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {loading ? (
        <div className="text-slate-400 text-xs text-center p-8">Loading audit stream...</div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/60 text-slate-400 uppercase font-medium">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Action Event</th>
                <th className="p-4">Entity</th>
                <th className="p-4">Resource ID</th>
                <th className="p-4">Client IP</th>
                <th className="p-4">Changes Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40">
                  <td className="p-4 text-slate-500 text-[11px]">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="p-4 font-bold text-cyan-400">{log.action}</td>
                  <td className="p-4 text-slate-300 font-sans font-semibold">{log.entityName}</td>
                  <td className="p-4 text-slate-400 text-[11px]">{log.entityId}</td>
                  <td className="p-4 text-amber-400 text-[11px]">{log.ipAddress}</td>
                  <td className="p-4 text-[10px] text-slate-400 truncate max-w-xs">{log.changesJson || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
