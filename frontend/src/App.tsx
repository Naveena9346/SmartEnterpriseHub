import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { EmployeePage } from './pages/EmployeePage';
import { ProjectPage } from './pages/ProjectPage';
import { KanbanPage } from './pages/KanbanPage';
import { WorkflowPage } from './pages/WorkflowPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, isLoading } = useAuth();
  if (isLoading) return <div className="p-8 text-center text-slate-400 text-sm">Authenticating Session...</div>;
  if (!token) return <Navigate to="/login" replace />;
  return <Layout>{children}</Layout>;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/employees" element={<ProtectedRoute><EmployeePage /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
          <Route path="/kanban" element={<ProtectedRoute><KanbanPage /></ProtectedRoute>} />
          <Route path="/workflows" element={<ProtectedRoute><WorkflowPage /></ProtectedRoute>} />
          <Route path="/crm" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/finance" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/documents" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/audit-logs" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
