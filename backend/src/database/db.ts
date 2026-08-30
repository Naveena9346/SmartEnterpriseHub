import { UserRole, AttendanceStatus, LeaveStatus, LeaveType, ProjectStatus, TaskStatus, TaskPriority, LeadStage, InvoiceStatus, ExpenseStatus, PurchaseOrderStatus, WorkflowModuleType, ApprovalAction } from '../config/constants';
import { PasswordUtils } from '../utils/password';

export interface UserEntity {
  id: string;
  orgId: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileEntity {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  bio?: string;
  timezone: string;
}

export interface OrganizationEntity {
  id: string;
  name: string;
  code: string;
  domain: string;
  settings: Record<string, any>;
  createdAt: string;
}

export interface CompanyEntity {
  id: string;
  orgId: string;
  name: string;
  taxId: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface DepartmentEntity {
  id: string;
  companyId: string;
  name: string;
  code: string;
  managerId?: string;
  budget: number;
  createdAt: string;
}

export interface TeamEntity {
  id: string;
  departmentId: string;
  name: string;
  leadId?: string;
  createdAt: string;
}

export interface EmployeeEntity {
  id: string;
  userId: string;
  companyId: string;
  deptId: string;
  teamId?: string;
  employeeCode: string;
  designation: string;
  employmentType: string;
  hireDate: string;
  salaryAmount: number;
  status: 'ACTIVE' | 'ON_LEAVE' | 'TERMINATED';
}

export interface AttendanceEntity {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  totalHours: number;
  status: AttendanceStatus;
}

export interface LeaveRequestEntity {
  id: string;
  employeeId: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  daysCount: number;
  reason: string;
  status: LeaveStatus;
  approvedBy?: string;
  createdAt: string;
}

export interface PayrollEntity {
  id: string;
  employeeId: string;
  payPeriodMonth: number;
  payPeriodYear: number;
  baseSalary: number;
  bonuses: number;
  deductions: number;
  taxAmount: number;
  netSalary: number;
  status: 'DRAFT' | 'PROCESSED' | 'PAID';
  createdAt: string;
}

export interface ProjectEntity {
  id: string;
  orgId: string;
  deptId: string;
  name: string;
  code: string;
  description: string;
  status: ProjectStatus;
  priority: TaskPriority;
  startDate: string;
  endDate: string;
  budget: number;
  managerId: string;
  createdAt: string;
}

export interface ProjectMemberEntity {
  id: string;
  projectId: string;
  userId: string;
  projectRole: string;
  allocatedHours: number;
}

export interface MilestoneEntity {
  id: string;
  projectId: string;
  title: string;
  dueDate: string;
  status: 'PENDING' | 'COMPLETED';
}

export interface TaskEntity {
  id: string;
  projectId: string;
  milestoneId?: string;
  title: string;
  description: string;
  assigneeId: string;
  reporterId: string;
  status: TaskStatus;
  priority: TaskPriority;
  estimatedHours: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubtaskEntity {
  id: string;
  taskId: string;
  title: string;
  isCompleted: boolean;
}

export interface WorklogEntity {
  id: string;
  taskId: string;
  userId: string;
  logDate: string;
  hours: number;
  description: string;
}

export interface CustomerEntity {
  id: string;
  orgId: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  status: 'LEAD' | 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface LeadEntity {
  id: string;
  customerId: string;
  title: string;
  estimatedValue: number;
  source: string;
  stage: LeadStage;
  assignedTo: string;
  createdAt: string;
}

export interface DealEntity {
  id: string;
  leadId: string;
  title: string;
  dealAmount: number;
  probability: number;
  expectedCloseDate: string;
  status: 'OPEN' | 'WON' | 'LOST';
  createdAt: string;
}

export interface ProductEntity {
  id: string;
  orgId: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  unitPrice: number;
  costPrice: number;
  reorderLevel: number;
  createdAt: string;
}

export interface WarehouseEntity {
  id: string;
  orgId: string;
  name: string;
  location: string;
  managerId?: string;
}

export interface InventoryEntity {
  id: string;
  productId: string;
  warehouseId: string;
  quantityOnHand: number;
  quantityReserved: number;
}

export interface SupplierEntity {
  id: string;
  orgId: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
}

export interface PurchaseOrderEntity {
  id: string;
  orgId: string;
  supplierId: string;
  poNumber: string;
  orderDate: string;
  expectedDate: string;
  totalAmount: number;
  status: PurchaseOrderStatus;
  createdAt: string;
}

export interface PurchaseOrderItemEntity {
  id: string;
  poId: string;
  productId: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
}

export interface InvoiceEntity {
  id: string;
  orgId: string;
  customerId: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  grandTotal: number;
  status: InvoiceStatus;
  createdAt: string;
}

export interface InvoiceItemEntity {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface ExpenseEntity {
  id: string;
  orgId: string;
  employeeId: string;
  category: string;
  amount: number;
  expenseDate: string;
  description: string;
  receiptUrl?: string;
  status: ExpenseStatus;
  createdAt: string;
}

export interface WorkflowEntity {
  id: string;
  orgId: string;
  name: string;
  moduleType: WorkflowModuleType;
  description: string;
  isActive: boolean;
}

export interface ApprovalRequestEntity {
  id: string;
  workflowId: string;
  requesterId: string;
  entityType: string;
  entityId: string;
  currentStep: number;
  status: ApprovalAction;
  createdAt: string;
}

export interface ApprovalStepEntity {
  id: string;
  approvalRequestId: string;
  stepNumber: number;
  approverRole: UserRole;
  approverUserId?: string;
  action: ApprovalAction;
  comments?: string;
  actedAt?: string;
}

export interface DocumentEntity {
  id: string;
  orgId: string;
  folderId?: string;
  title: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  storageKey: string;
  version: number;
  uploadedBy: string;
  createdAt: string;
}

export interface AuditLogEntity {
  id: string;
  orgId: string;
  userId: string;
  action: string;
  entityName: string;
  entityId: string;
  changesJson?: string;
  ipAddress: string;
  timestamp: string;
}

export class DatabaseContext {
  public static users: UserEntity[] = [];
  public static userProfiles: UserProfileEntity[] = [];
  public static organizations: OrganizationEntity[] = [];
  public static companies: CompanyEntity[] = [];
  public static departments: DepartmentEntity[] = [];
  public static teams: TeamEntity[] = [];
  public static employees: EmployeeEntity[] = [];
  public static attendances: AttendanceEntity[] = [];
  public static leaveRequests: LeaveRequestEntity[] = [];
  public static payrolls: PayrollEntity[] = [];
  public static projects: ProjectEntity[] = [];
  public static projectMembers: ProjectMemberEntity[] = [];
  public static milestones: MilestoneEntity[] = [];
  public static tasks: TaskEntity[] = [];
  public static subtasks: SubtaskEntity[] = [];
  public static worklogs: WorklogEntity[] = [];
  public static customers: CustomerEntity[] = [];
  public static leads: LeadEntity[] = [];
  public static deals: DealEntity[] = [];
  public static products: ProductEntity[] = [];
  public static warehouses: WarehouseEntity[] = [];
  public static inventories: InventoryEntity[] = [];
  public static suppliers: SupplierEntity[] = [];
  public static purchaseOrders: PurchaseOrderEntity[] = [];
  public static purchaseOrderItems: PurchaseOrderItemEntity[] = [];
  public static invoices: InvoiceEntity[] = [];
  public static invoiceItems: InvoiceItemEntity[] = [];
  public static expenses: ExpenseEntity[] = [];
  public static workflows: WorkflowEntity[] = [];
  public static approvalRequests: ApprovalRequestEntity[] = [];
  public static approvalSteps: ApprovalStepEntity[] = [];
  public static documents: DocumentEntity[] = [];
  public static auditLogs: AuditLogEntity[] = [];

  private static isInitialized = false;

  public static async initializeSeedData(): Promise<void> {
    if (this.isInitialized) return;

    const defaultPassword = await PasswordUtils.hash('Admin@123456');

    // 1. Organization
    const defaultOrg: OrganizationEntity = {
      id: 'org-global-1',
      name: 'Apex Smart Enterprise Group',
      code: 'APEX-ENT',
      domain: 'apexenterprise.com',
      settings: { theme: 'dark', currency: 'USD', multiCurrency: true },
      createdAt: new Date().toISOString()
    };
    this.organizations.push(defaultOrg);

    // 2. Company
    const defaultCompany: CompanyEntity = {
      id: 'comp-1',
      orgId: defaultOrg.id,
      name: 'Apex Global Software Inc',
      taxId: 'US-99882231-TX',
      email: 'contact@apexenterprise.com',
      phone: '+1 (555) 019-2831',
      address: '100 Enterprise Way, Silicon Valley, CA',
      createdAt: new Date().toISOString()
    };
    this.companies.push(defaultCompany);

    // 3. Departments
    const engDept: DepartmentEntity = {
      id: 'dept-eng',
      companyId: defaultCompany.id,
      name: 'Software Engineering',
      code: 'ENG',
      budget: 1500000,
      createdAt: new Date().toISOString()
    };
    const hrDept: DepartmentEntity = {
      id: 'dept-hr',
      companyId: defaultCompany.id,
      name: 'Human Resources',
      code: 'HR',
      budget: 400000,
      createdAt: new Date().toISOString()
    };
    const salesDept: DepartmentEntity = {
      id: 'dept-sales',
      companyId: defaultCompany.id,
      name: 'Global Sales & Enterprise CRM',
      code: 'SALES',
      budget: 800000,
      createdAt: new Date().toISOString()
    };
    this.departments.push(engDept, hrDept, salesDept);

    // 4. Teams
    const coreTeam: TeamEntity = {
      id: 'team-core',
      departmentId: engDept.id,
      name: 'Core Platform Engineering',
      createdAt: new Date().toISOString()
    };
    this.teams.push(coreTeam);

    // 5. Users & Profiles across 10 Roles
    const userRoleConfigs = [
      { id: 'usr-admin', email: 'admin@smartenterprisehub.com', role: UserRole.SUPER_ADMIN, firstName: 'Super', lastName: 'Administrator' },
      { id: 'usr-orgadmin', email: 'orgadmin@smartenterprisehub.com', role: UserRole.ORG_ADMIN, firstName: 'Sarah', lastName: 'Connor' },
      { id: 'usr-hrmgr', email: 'hrmanager@smartenterprisehub.com', role: UserRole.HR_MANAGER, firstName: 'Helen', lastName: 'Vance' },
      { id: 'usr-projmgr', email: 'projmanager@smartenterprisehub.com', role: UserRole.PROJECT_MANAGER, firstName: 'Peter', lastName: 'Parker' },
      { id: 'usr-teammgr', email: 'teammanager@smartenterprisehub.com', role: UserRole.TEAM_MANAGER, firstName: 'Tim', lastName: 'Drake' },
      { id: 'usr-emp1', email: 'employee1@smartenterprisehub.com', role: UserRole.EMPLOYEE, firstName: 'Edward', lastName: 'Nygma' },
      { id: 'usr-salesmgr', email: 'salesmanager@smartenterprisehub.com', role: UserRole.SALES_MANAGER, firstName: 'Sam', lastName: 'Winchester' },
      { id: 'usr-accountant', email: 'accountant@smartenterprisehub.com', role: UserRole.ACCOUNTANT, firstName: 'Arthur', lastName: 'Dent' },
      { id: 'usr-invmgr', email: 'invmanager@smartenterprisehub.com', role: UserRole.INVENTORY_MANAGER, firstName: 'Ian', lastName: 'Malcolm' },
      { id: 'usr-viewer', email: 'viewer@smartenterprisehub.com', role: UserRole.VIEWER, firstName: 'Victor', lastName: 'Stone' }
    ];

    for (const u of userRoleConfigs) {
      const userObj: UserEntity = {
        id: u.id,
        orgId: defaultOrg.id,
        email: u.email,
        passwordHash: defaultPassword,
        role: u.role,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const profileObj: UserProfileEntity = {
        id: `prof-${u.id}`,
        userId: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        phone: '+1 555-0100',
        timezone: 'UTC'
      };
      this.users.push(userObj);
      this.userProfiles.push(profileObj);

      // Create matching Employee entity
      const empObj: EmployeeEntity = {
        id: `emp-${u.id}`,
        userId: u.id,
        companyId: defaultCompany.id,
        deptId: u.role === UserRole.HR_MANAGER ? hrDept.id : (u.role === UserRole.SALES_MANAGER ? salesDept.id : engDept.id),
        employeeCode: `EMP-${u.id.toUpperCase()}`,
        designation: u.role.replace('_', ' '),
        employmentType: 'FULL_TIME',
        hireDate: '2024-01-15',
        salaryAmount: 95000,
        status: 'ACTIVE'
      };
      this.employees.push(empObj);
    }

    // 6. Projects & Tasks
    const mainProject: ProjectEntity = {
      id: 'proj-smart-1',
      orgId: defaultOrg.id,
      deptId: engDept.id,
      name: 'SmartEnterpriseHub Enterprise Platform v1.0',
      code: 'SEH-V1',
      description: 'Building modern enterprise resource suite',
      status: ProjectStatus.IN_PROGRESS,
      priority: TaskPriority.HIGH,
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      budget: 500000,
      managerId: 'usr-projmgr',
      createdAt: new Date().toISOString()
    };
    this.projects.push(mainProject);

    const task1: TaskEntity = {
      id: 'task-101',
      projectId: mainProject.id,
      title: 'Architect Authentication and RBAC Engine',
      description: 'Implement JWT pair token verification and role guards',
      assigneeId: 'usr-emp1',
      reporterId: 'usr-projmgr',
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.URGENT,
      estimatedHours: 40,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.tasks.push(task1);

    // 7. Workflow & Sample Expense Request
    const expenseWorkflow: WorkflowEntity = {
      id: 'wf-expense-1',
      orgId: defaultOrg.id,
      name: 'Enterprise Expense Approval Flow',
      moduleType: WorkflowModuleType.EXPENSE_CLAIM,
      description: '2-Step Approval: Manager -> Finance Accountant',
      isActive: true
    };
    this.workflows.push(expenseWorkflow);

    const sampleExpense: ExpenseEntity = {
      id: 'exp-1001',
      orgId: defaultOrg.id,
      employeeId: 'emp-usr-emp1',
      category: 'Software Licensing',
      amount: 450.00,
      expenseDate: new Date().toISOString(),
      description: 'Cloud Infrastructure Developer Tools',
      status: ExpenseStatus.SUBMITTED,
      createdAt: new Date().toISOString()
    };
    this.expenses.push(sampleExpense);

    const expenseApprovalReq: ApprovalRequestEntity = {
      id: 'appreq-exp-1001',
      workflowId: expenseWorkflow.id,
      requesterId: 'usr-emp1',
      entityType: 'EXPENSE',
      entityId: sampleExpense.id,
      currentStep: 1,
      status: ApprovalAction.PENDING,
      createdAt: new Date().toISOString()
    };
    this.approvalRequests.push(expenseApprovalReq);

    const step1: ApprovalStepEntity = {
      id: 'appstep-1',
      approvalRequestId: expenseApprovalReq.id,
      stepNumber: 1,
      approverRole: UserRole.TEAM_MANAGER,
      action: ApprovalAction.PENDING
    };
    const step2: ApprovalStepEntity = {
      id: 'appstep-2',
      approvalRequestId: expenseApprovalReq.id,
      stepNumber: 2,
      approverRole: UserRole.ACCOUNTANT,
      action: ApprovalAction.PENDING
    };
    this.approvalSteps.push(step1, step2);

    this.isInitialized = true;
  }
}
