import React, { useEffect, useState } from 'react';
import { Briefcase, Plus, CheckCircle, Clock, DollarSign, User } from 'lucide-react';
import { apiClient } from '../services/api';
import { Project } from '../types';

export const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/projects')
      .then((res) => setProjects(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <span>Projects Workspace & Portfolio</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Track enterprise deliverables, project budgets, milestone completion & progress</p>
        </div>
      </div>

      {loading ? (
        <div className="text-slate-400 text-xs text-center p-8">Loading projects...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 text-[10px] font-bold text-cyan-400 bg-cyan-950 border border-cyan-800 rounded">
                    {proj.code}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">{proj.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{proj.description}</p>
                </div>
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {proj.status}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-cyan-400">{proj.progressPercentage}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${proj.progressPercentage}%` }} />
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-xs text-slate-400">
                <div>
                  <span className="block text-[10px] text-slate-500">Tasks Completed</span>
                  <span className="font-semibold text-slate-200">{proj.completedTasks} / {proj.totalTasks}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500">Budget</span>
                  <span className="font-semibold text-emerald-400">${proj.budget?.toLocaleString()}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500">Project Manager</span>
                  <span className="font-semibold text-slate-200 truncate block">{proj.managerName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
