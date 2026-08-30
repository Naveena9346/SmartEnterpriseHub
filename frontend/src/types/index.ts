export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ORG_ADMIN = 'ORG_ADMIN',
  HR_MANAGER = 'HR_MANAGER',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  TEAM_MANAGER = 'TEAM_MANAGER',
  EMPLOYEE = 'EMPLOYEE',
  SALES_MANAGER = 'SALES_MANAGER',
  ACCOUNTANT = 'ACCOUNTANT',
  INVENTORY_MANAGER = 'INVENTORY_MANAGER',
  VIEWER = 'VIEWER'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  orgId: string;
  firstName: string;
  lastName: string;
  employeeId?: string;
}

export interface Employee {
  id: string;
  userId: string;
  email: string;
  role: UserRole;
  employeeCode: string;
  firstName: string;
  lastName: string;
  fullName: string;
  designation: string;
  departmentName: string;
  companyName: string;
  salaryAmount: number;
  status: 'ACTIVE' | 'ON_LEAVE' | 'TERMINATED';
}

export interface Project {
  id: string;
  orgId: string;
  name: string;
  code: string;
  description: string;
  status: string;
  priority: string;
  budget: number;
  progressPercentage: number;
  totalTasks: number;
  completedTasks: number;
  managerName: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assigneeName: string;
  status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  estimatedHours: number;
  loggedHours: number;
}

export interface ApprovalRequest {
  id: string;
  workflowId: string;
  requesterName: string;
  entityType: string;
  entityId: string;
  currentStep: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  canUserApprove: boolean;
  steps: Array<{
    id: string;
    stepNumber: number;
    approverRole: UserRole;
    action: string;
    comments?: string;
  }>;
}

export interface ExecutiveDashboard {
  totalEmployees: number;
  activeProjects: number;
  pendingTasks: number;
  pendingLeaves: number;
  totalCustomers: number;
  totalProducts: number;
  financials: {
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
  };
  attendanceStats: {
    presentCount: number;
    lateCount: number;
    absentCount: number;
  };
  recentAuditLogs: Array<{
    id: string;
    action: string;
    entityName: string;
    ipAddress: string;
    timestamp: string;
  }>;
}
