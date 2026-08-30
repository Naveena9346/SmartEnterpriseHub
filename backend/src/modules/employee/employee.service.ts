import { DatabaseContext, EmployeeEntity, UserEntity, UserProfileEntity } from '../../database/db';
import { NotFoundError, ConflictError } from '../../utils/errors';
import { UserRole } from '../../config/constants';
import { PasswordUtils } from '../../utils/password';

export class EmployeeService {
  public async getAll(orgId: string, search?: string, deptId?: string) {
    let employees = DatabaseContext.employees.filter((emp) => {
      const user = DatabaseContext.users.find((u) => u.id === emp.userId);
      return user && user.orgId === orgId;
    });

    if (deptId) {
      employees = employees.filter((e) => e.deptId === deptId);
    }

    const result = employees.map((emp) => {
      const user = DatabaseContext.users.find((u) => u.id === emp.userId);
      const profile = DatabaseContext.userProfiles.find((p) => p.userId === emp.userId);
      const dept = DatabaseContext.departments.find((d) => d.id === emp.deptId);
      const comp = DatabaseContext.companies.find((c) => c.id === emp.companyId);

      return {
        ...emp,
        email: user?.email || '',
        role: user?.role || UserRole.EMPLOYEE,
        firstName: profile?.firstName || '',
        lastName: profile?.lastName || '',
        fullName: `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim(),
        departmentName: dept?.name || 'N/A',
        companyName: comp?.name || 'N/A'
      };
    });

    if (search) {
      const query = search.toLowerCase();
      return result.filter(
        (r) =>
          r.fullName.toLowerCase().includes(query) ||
          r.email.toLowerCase().includes(query) ||
          r.employeeCode.toLowerCase().includes(query) ||
          r.designation.toLowerCase().includes(query)
      );
    }

    return result;
  }

  public async getById(id: string, orgId: string) {
    const emp = DatabaseContext.employees.find((e) => e.id === id);
    if (!emp) throw new NotFoundError('Employee record not found');

    const user = DatabaseContext.users.find((u) => u.id === emp.userId);
    if (!user || user.orgId !== orgId) throw new NotFoundError('Employee record not found in organization');

    const profile = DatabaseContext.userProfiles.find((p) => p.userId === emp.userId);
    const dept = DatabaseContext.departments.find((d) => d.id === emp.deptId);
    const comp = DatabaseContext.companies.find((c) => c.id === emp.companyId);

    return {
      ...emp,
      email: user.email,
      role: user.role,
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      fullName: `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim(),
      phone: profile?.phone,
      departmentName: dept?.name || 'N/A',
      companyName: comp?.name || 'N/A'
    };
  }

  public async create(orgId: string, data: any) {
    const existingUser = DatabaseContext.users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
    if (existingUser) throw new ConflictError('User with this email already exists');

    const hashedPassword = await PasswordUtils.hash(data.password || 'Welcome@123456');
    const userId = `usr-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

    const newUser: UserEntity = {
      id: userId,
      orgId: orgId,
      email: data.email,
      passwordHash: hashedPassword,
      role: data.role || UserRole.EMPLOYEE,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newProfile: UserProfileEntity = {
      id: `prof-${userId}`,
      userId: userId,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      timezone: 'UTC'
    };

    const empId = `emp-${Date.now()}`;
    const newEmployee: EmployeeEntity = {
      id: empId,
      userId: userId,
      companyId: data.companyId || DatabaseContext.companies[0]?.id || 'comp-1',
      deptId: data.deptId || DatabaseContext.departments[0]?.id || 'dept-eng',
      employeeCode: data.employeeCode || `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      designation: data.designation || 'Software Engineer',
      employmentType: data.employmentType || 'FULL_TIME',
      hireDate: data.hireDate || new Date().toISOString().split('T')[0],
      salaryAmount: data.salaryAmount || 60000,
      status: 'ACTIVE'
    };

    DatabaseContext.users.push(newUser);
    DatabaseContext.userProfiles.push(newProfile);
    DatabaseContext.employees.push(newEmployee);

    return this.getById(empId, orgId);
  }

  public async update(id: string, orgId: string, data: any) {
    const emp = DatabaseContext.employees.find((e) => e.id === id);
    if (!emp) throw new NotFoundError('Employee not found');

    const user = DatabaseContext.users.find((u) => u.id === emp.userId);
    if (!user || user.orgId !== orgId) throw new NotFoundError('Employee not found');

    if (data.designation) emp.designation = data.designation;
    if (data.salaryAmount) emp.salaryAmount = data.salaryAmount;
    if (data.status) emp.status = data.status;
    if (data.deptId) emp.deptId = data.deptId;
    if (data.role && user) user.role = data.role;

    const profile = DatabaseContext.userProfiles.find((p) => p.userId === emp.userId);
    if (profile) {
      if (data.firstName) profile.firstName = data.firstName;
      if (data.lastName) profile.lastName = data.lastName;
      if (data.phone) profile.phone = data.phone;
    }

    return this.getById(id, orgId);
  }
}
