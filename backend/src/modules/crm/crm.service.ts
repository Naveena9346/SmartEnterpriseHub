import { DatabaseContext, CustomerEntity, LeadEntity, DealEntity } from '../../database/db';
import { NotFoundError } from '../../utils/errors';
import { LeadStage } from '../../config/constants';

export class CrmService {
  public async getCustomers(orgId: string, search?: string) {
    let customers = DatabaseContext.customers.filter((c) => c.orgId === orgId);
    if (search) {
      const q = search.toLowerCase();
      customers = customers.filter(
        (c) =>
          c.companyName.toLowerCase().includes(q) ||
          c.contactName.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)
      );
    }
    return customers;
  }

  public async getLeads(orgId: string) {
    const customers = DatabaseContext.customers.filter((c) => c.orgId === orgId);
    const customerIds = customers.map((c) => c.id);
    const leads = DatabaseContext.leads.filter((l) => customerIds.includes(l.customerId));

    return leads.map((l) => {
      const cust = customers.find((c) => c.id === l.customerId);
      const assigneeProfile = DatabaseContext.userProfiles.find((p) => p.userId === l.assignedTo);
      return {
        ...l,
        customerName: cust?.companyName || 'N/A',
        assigneeName: assigneeProfile ? `${assigneeProfile.firstName} ${assigneeProfile.lastName}` : 'Unassigned'
      };
    });
  }

  public async createCustomer(orgId: string, data: any) {
    const newCustomer: CustomerEntity = {
      id: `cust-${Date.now()}`,
      orgId,
      companyName: data.companyName,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone || '+1 555-0199',
      industry: data.industry || 'Technology',
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };
    DatabaseContext.customers.push(newCustomer);
    return newCustomer;
  }

  public async createLead(orgId: string, userId: string, data: any) {
    const newLead: LeadEntity = {
      id: `lead-${Date.now()}`,
      customerId: data.customerId || DatabaseContext.customers[0]?.id || 'cust-1',
      title: data.title,
      estimatedValue: data.estimatedValue || 25000,
      source: data.source || 'Website Inbound',
      stage: data.stage || LeadStage.NEW,
      assignedTo: data.assignedTo || userId,
      createdAt: new Date().toISOString()
    };
    DatabaseContext.leads.push(newLead);
    return newLead;
  }
}
