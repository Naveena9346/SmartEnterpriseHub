import React, { useEffect, useState } from 'react';
import { GitPullRequest, Check, X, Shield, ArrowRight } from 'lucide-react';
import { apiClient } from '../services/api';
import { ApprovalRequest } from '../types';

export const WorkflowPage: React.FC = () => {
  const [approvals, setApprovals] = useState<ApprovalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApprovals = async () => {
    try {
      const res = await apiClient.get('/workflows/approvals');
      setApprovals(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  const handleAction = async (requestId: string, action: 'APPROVED' | 'REJECTED') => {
    try {
      await apiClient.post(`/workflows/approvals/${requestId}/action`, {
        action,
        comments: `Action ${action} taken via Enterprise Management Console`
      });
      fetchApprovals();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to process approval step');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
          <GitPullRequest className="w-5 h-5 text-cyan-400" />
          <span>Multi-Step Workflow & Approval Engine</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Configure & execute sequential approval rules for expenses, leaves, purchase orders and documents</p>
      </div>

      {loading ? (
        <div className="text-slate-400 text-xs text-center p-8">Loading approval workflows...</div>
      ) : (
        <div className="space-y-4">
          {approvals.map((req) => (
            <div key={req.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold text-cyan-400 bg-cyan-950 border border-cyan-800 rounded">
                      {req.entityType}
                    </span>
                    <h3 className="text-sm font-bold text-white">Approval Request #{req.id}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Requester: <strong className="text-slate-200">{req.requesterName}</strong></p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                    req.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    req.status === 'REJECTED' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                    'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {req.status}
                  </span>

                  {req.canUserApprove && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAction(req.id, 'APPROVED')}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow transition"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleAction(req.id, 'REJECTED')}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg shadow transition"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Step Sequence visualization */}
              <div className="flex items-center space-x-3 pt-3 border-t border-slate-800/60 overflow-x-auto">
                {req.steps.map((step, idx) => (
                  <React.Fragment key={step.id}>
                    <div className={`p-3 rounded-xl border flex items-center space-x-2 text-xs ${
                      step.action === 'APPROVED' ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-400' :
                      step.action === 'REJECTED' ? 'bg-rose-950/30 border-rose-800/50 text-rose-400' :
                      'bg-slate-800/60 border-slate-700 text-slate-400'
                    }`}>
                      <Shield className="w-3.5 h-3.5" />
                      <div>
                        <span className="block font-semibold">Step {step.stepNumber}: {step.approverRole}</span>
                        <span className="text-[10px] opacity-80">{step.action}</span>
                      </div>
                    </div>
                    {idx < req.steps.length - 1 && <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
