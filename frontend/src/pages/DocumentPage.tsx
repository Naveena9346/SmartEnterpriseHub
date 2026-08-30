import React, { useEffect, useState } from 'react';
import { FileText, Folder, Upload, Download, ShieldCheck, HardDrive } from 'lucide-react';
import { apiClient } from '../services/api';

export const DocumentPage: React.FC = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/documents')
      .then((res) => setDocuments(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const formatBytes = (bytes: number) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span>Enterprise Knowledge & Document Repository</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Centralized secure document storage, file versioning, access rights & metadata</p>
        </div>

        <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold shadow-lg transition">
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {loading ? (
        <div className="text-slate-400 text-xs text-center p-8">Loading document repository...</div>
      ) : (
        <div className="space-y-6">
          {/* Document Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/60 text-slate-400 uppercase font-medium">
                <tr>
                  <th className="p-4">Document Title</th>
                  <th className="p-4">File Name</th>
                  <th className="p-4">File Size</th>
                  <th className="p-4">Version</th>
                  <th className="p-4">Uploaded Date</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-800/40">
                    <td className="p-4 font-semibold text-white flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>{doc.title}</span>
                    </td>
                    <td className="p-4 text-slate-400 font-mono">{doc.fileName}</td>
                    <td className="p-4 text-slate-400">{formatBytes(doc.fileSize)}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 border border-slate-700 text-slate-300 rounded">
                        v{doc.version}.0
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">{new Date(doc.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <button className="flex items-center space-x-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded border border-slate-700 text-[11px] font-medium transition">
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
