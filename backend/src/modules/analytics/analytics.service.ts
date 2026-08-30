import { DatabaseContext } from '../../database/db';

export class AnalyticsService {
  public async getExecutiveDashboardStats(orgId: string) {
    const employees = DatabaseContext.employees;
    const projects = DatabaseContext.projects.filter((p) => p.orgId === orgId);
    const tasks = DatabaseContext.tasks;
    const pendingTasks = tasks.filter((t) => t.status !== 'DONE');
    const leaveRequests = DatabaseContext.leaveRequests;
    const pendingLeaves = leaveRequests.filter((l) => l.status === 'PENDING');
    const expenses = DatabaseContext.expenses.filter((e) => e.orgId === orgId);
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    const invoices = DatabaseContext.invoices.filter((i) => i.orgId === orgId);
    const totalRevenue = invoices
      .filter((i) => i.status === 'PAID')
      .reduce((acc, curr) => acc + curr.grandTotal, 0);

    const customers = DatabaseContext.customers.filter((c) => c.orgId === orgId);
    const products = DatabaseContext.products.filter((p) => p.orgId === orgId);

    return {
      totalEmployees: employees.length,
      activeProjects: projects.filter((p) => p.status === 'IN_PROGRESS').length,
      pendingTasks: pendingTasks.length,
      pendingLeaves: pendingLeaves.length,
      totalCustomers: customers.length,
      totalProducts: products.length,
      financials: {
        totalRevenue,
        totalExpenses,
        netProfit: totalRevenue - totalExpenses
      },
      attendanceStats: {
        presentCount: DatabaseContext.attendances.filter((a) => a.status === 'PRESENT').length,
        lateCount: DatabaseContext.attendances.filter((a) => a.status === 'LATE').length,
        absentCount: DatabaseContext.attendances.filter((a) => a.status === 'ABSENT').length
      },
      recentAuditLogs: DatabaseContext.auditLogs.slice(-10).reverse()
    };
  }
}
