import { DatabaseContext, ProjectEntity, TaskEntity } from '../../database/db';
import { NotFoundError } from '../../utils/errors';
import { ProjectStatus, TaskPriority } from '../../config/constants';

export class ProjectService {
  public async getAll(orgId: string, search?: string) {
    let projects = DatabaseContext.projects.filter((p) => p.orgId === orgId);

    if (search) {
      const q = search.toLowerCase();
      projects = projects.filter((p) => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q));
    }

    return projects.map((p) => {
      const tasks = DatabaseContext.tasks.filter((t) => t.projectId === p.id);
      const completedTasks = tasks.filter((t) => t.status === 'DONE');
      const manager = DatabaseContext.users.find((u) => u.id === p.managerId);
      const profile = DatabaseContext.userProfiles.find((pr) => pr.userId === p.managerId);

      return {
        ...p,
        totalTasks: tasks.length,
        completedTasks: completedTasks.length,
        progressPercentage: tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0,
        managerName: profile ? `${profile.firstName} ${profile.lastName}` : manager?.email || 'N/A'
      };
    });
  }

  public async getById(id: string, orgId: string) {
    const project = DatabaseContext.projects.find((p) => p.id === id && p.orgId === orgId);
    if (!project) throw new NotFoundError('Project not found');

    const tasks = DatabaseContext.tasks.filter((t) => t.projectId === project.id);
    const members = DatabaseContext.projectMembers.filter((pm) => pm.projectId === project.id);

    return {
      ...project,
      tasks,
      members
    };
  }

  public async create(orgId: string, userId: string, data: any) {
    const newProject: ProjectEntity = {
      id: `proj-${Date.now()}`,
      orgId,
      deptId: data.deptId || DatabaseContext.departments[0]?.id || 'dept-eng',
      name: data.name,
      code: data.code || `PRJ-${Math.floor(100 + Math.random() * 900)}`,
      description: data.description || '',
      status: data.status || ProjectStatus.PLANNING,
      priority: data.priority || TaskPriority.MEDIUM,
      startDate: data.startDate || new Date().toISOString().split('T')[0],
      endDate: data.endDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      budget: data.budget || 50000,
      managerId: data.managerId || userId,
      createdAt: new Date().toISOString()
    };

    DatabaseContext.projects.push(newProject);
    return newProject;
  }

  public async update(id: string, orgId: string, data: any) {
    const project = DatabaseContext.projects.find((p) => p.id === id && p.orgId === orgId);
    if (!project) throw new NotFoundError('Project not found');

    if (data.name) project.name = data.name;
    if (data.description) project.description = data.description;
    if (data.status) project.status = data.status;
    if (data.priority) project.priority = data.priority;
    if (data.budget) project.budget = data.budget;

    return project;
  }
}
