import { DatabaseContext, InvoiceEntity, InvoiceItemEntity, ExpenseEntity } from '../../database/db';
import { InvoiceStatus, ExpenseStatus } from '../../config/constants';

export class FinanceService {
  public async getInvoices(orgId: string) {
    const invoices = DatabaseContext.invoices.filter((i) => i.orgId === orgId);
    return invoices.map((inv) => {
      const cust = DatabaseContext.customers.find((c) => c.id === inv.customerId);
      const items = DatabaseContext.invoiceItems.filter((item) => item.invoiceId === inv.id);
      return {
        ...inv,
        customerName: cust?.companyName || 'Enterprise Client Inc',
        items
      };
    });
  }

  public async getExpenses(orgId: string) {
    const expenses = DatabaseContext.expenses.filter((e) => e.orgId === orgId);
    return expenses.map((exp) => {
      const emp = DatabaseContext.employees.find((e) => e.id === exp.employeeId);
      const profile = emp ? DatabaseContext.userProfiles.find((p) => p.userId === emp.userId) : undefined;
      return {
        ...exp,
        employeeName: profile ? `${profile.firstName} ${profile.lastName}` : 'N/A'
      };
    });
  }

  public async createInvoice(orgId: string, data: any) {
    const subtotal = data.subtotal || 15000;
    const taxTotal = subtotal * 0.1;
    const grandTotal = subtotal + taxTotal;

    const newInvoice: InvoiceEntity = {
      id: `inv-${Date.now()}`,
      orgId,
      customerId: data.customerId || DatabaseContext.customers[0]?.id || 'cust-1',
      invoiceNumber: data.invoiceNumber || `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      issueDate: data.issueDate || new Date().toISOString().split('T')[0],
      dueDate: data.dueDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      subtotal,
      taxTotal,
      discountTotal: 0,
      grandTotal,
      status: data.status || InvoiceStatus.SENT,
      createdAt: new Date().toISOString()
    };

    DatabaseContext.invoices.push(newInvoice);

    const newItem: InvoiceItemEntity = {
      id: `item-${Date.now()}`,
      invoiceId: newInvoice.id,
      description: data.description || 'Enterprise Software Solution License & Maintenance',
      quantity: 1,
      unitPrice: subtotal,
      amount: subtotal
    };
    DatabaseContext.invoiceItems.push(newItem);

    return newInvoice;
  }
}
