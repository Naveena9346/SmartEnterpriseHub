import React, { useEffect, useState } from 'react';
import { KanbanSquare, Plus, Clock, UserCheck } from 'lucide-react';
import { apiClient } from '../services/api';
import { Task } from '../types';

export const KanbanPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/tasks/my-tasks')
      .then((res) => setTasks(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { key: 'TODO', title: 'To Do', color: 'border-slate-700 bg-slate-900/60' },
    { key: 'IN_PROGRESS', title: 'In Progress', color: 'border-cyan-800 bg-cyan-950/20' },
    { key: 'IN_REVIEW', title: 'Under Review', color: 'border-amber-800 bg-amber-950/20' },
    { key: 'DONE', title: 'Completed', color: 'border-emerald-800 bg-emerald-950/20' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
          <KanbanSquare className="w-5 h-5 text-cyan-400" />
          <span>Enterprise Kanban & Task Management</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Manage interactive task columns, priority tags, time tracking & worklogs</p>
      </div>

      {loading ? (
        <div className="text-slate-400 text-xs text-center p-8">Loading tasks...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.key);
            return (
              <div key={col.key} className={`border rounded-xl p-4 flex flex-col h-[650px] ${col.color}`}>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">{col.title}</h3>
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-bold text-[10px] flex items-center justify-center">
                    {colTasks.length}
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pt-3">
                  {colTasks.map((t) => (
                    <div key={t.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2 hover:border-slate-700 transition shadow-sm">
                      <span className={`inline-block px-2 py-0.5 text-[9px] font-bold rounded ${
                        t.priority === 'URGENT' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      }`}>
                        {t.priority}
                      </span>
                      <h4 className="text-xs font-semibold text-white">{t.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{t.description}</p>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>Est: {t.estimatedHours}h</span>
                        </span>
                        <span className="font-semibold text-cyan-400">{t.assigneeName}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
