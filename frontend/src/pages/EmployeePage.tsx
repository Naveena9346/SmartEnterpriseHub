import React, { useEffect, useState } from 'react';
import { Users, Plus, Search, Mail, Shield, Building } from 'lucide-react';
import { apiClient } from '../services/api';
import { Employee, UserRole } from '../types';
import { useAuth } from '../context/AuthContext';

export const EmployeePage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { hasRole } = useAuth();

  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.EMPLOYEE);
  const [salaryAmount, setSalaryAmount] = useState('75000');

  const fetchEmployees = async () => {
    try {
      const res = await apiClient.get(`/employees${search ? `?search=${search}` : ''}`);
      setEmployees(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search]);

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/employees', {
        firstName,
        lastName,
        email,
        designation,
        role,
        salaryAmount: parseFloat(salaryAmount)
      });
      setShowModal(false);
      fetchEmployees();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to create employee');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <span>Employee Directory & HR Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Manage workforce profiles, roles, designations, and departmental allocations</p>
        </div>

        {hasRole(UserRole.SUPER_ADMIN, UserRole.ORG_ADMIN, UserRole.HR_MANAGER) && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold shadow-lg transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Employee</span>
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by name, email, code or designation..."
          className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Employee Grid */}
      {loading ? (
        <div className="text-slate-400 text-xs text-center p-8">Loading employees...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((emp) => (
            <div key={emp.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4 hover:border-slate-700 transition">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400 text-sm">
                    {emp.firstName?.[0] || 'E'}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{emp.fullName}</h3>
                    <p className="text-xs text-slate-400">{emp.designation}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded text-cyan-400 bg-cyan-950 border border-cyan-800">
                  {emp.role}
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/60 text-xs text-slate-400">
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span className="truncate">{emp.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <span>{emp.departmentName} ({emp.employeeCode})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-3.5 h-3.5 text-slate-500" />
                  <span>Salary: <strong className="text-emerald-400">${emp.salaryAmount?.toLocaleString()}/yr</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Employee Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md space-y-4">
            <h3 className="text-base font-bold text-white">Add New Employee Profile</h3>
            <form onSubmit={handleCreateEmployee} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">First Name</label>
                <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-200" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Last Name</label>
                <input required value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-200" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Corporate Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-200" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Job Designation</label>
                <input required value={designation} onChange={(e) => setDesignation(e.target.value)} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-200" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">System Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-200">
                  {Object.values(UserRole).map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Base Salary (USD)</label>
                <input type="number" value={salaryAmount} onChange={(e) => setSalaryAmount(e.target.value)} className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-200" />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-cyan-600 text-white font-semibold rounded hover:bg-cyan-500">Create Employee</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
