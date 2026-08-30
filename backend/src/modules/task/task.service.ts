import { DatabaseContext, TaskEntity, WorklogEntity } from '../../database/db';
import { NotFoundError } from '../../utils/errors';
import { TaskStatus, TaskPriority } from '../../config/constants';

export class TaskService {
  public async getByProject(projectId: string) {
    const tasks = DatabaseContext.tasks.filter((t) => t.projectId === projectId);
    return tasks.map((t) => {
      const assignee = DatabaseContext.users.find((u) => u.id === t.assigneeId);
      const assigneeProfile = DatabaseContext.userProfiles.find((p) => p.userId === t.assigneeId);
      const subtasks = DatabaseContext.subtasks.filter((st) => st.taskId === t.id);
      const worklogs = DatabaseContext.worklogs.filter((wl) => wl.taskId === t.id);
      const loggedHours = worklogs.reduce((acc, curr) => acc + curr.hours, 0);

      return {
        ...t,
        assigneeName: assigneeProfile ? `${assigneeProfile.firstName} ${assigneeProfile.lastName}` : assignee?.email || 'Unassigned',
        subtaskCount: subtasks.length,
        completedSubtasks: subtasks.filter((st) => st.isCompleted).length,
        loggedHours
      };
    });
  }

  public async getMyTasks(userId: string) {
    const tasks = DatabaseContext.tasks.filter((t) => t.assigneeId === userId);
    return tasks.map((t) => {
      const project = DatabaseContext.projects.find((p) => p.id === t.projectId);
      return {
        ...t,
        projectName: project?.name || 'N/A'
      };
    });
  }

  public async create(userId: string, data: any) {
    const project = DatabaseContext.projects.find((p) => p.id === data.projectId);
    if (!project) throw new NotFoundError('Target project not found');

    const newTask: TaskEntity = {
      id: `task-${Date.now()}`,
      projectId: data.projectId,
      milestoneId: data.milestoneId,
      title: data.title,
      description: data.description || '',
      assigneeId: data.assigneeId || userId,
      reporterId: userId,
      status: data.status || TaskStatus.TODO,
      priority: data.priority || TaskPriority.MEDIUM,
      estimatedHours: data.estimatedHours || 8,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    DatabaseContext.tasks.push(newTask);
    return newTask;
  }

  public async updateStatus(taskId: string, newStatus: TaskStatus) {
    const task = DatabaseContext.tasks.find((t) => t.id === taskId);
    if (!task) throw new NotFoundError('Task not found');

    task.status = newStatus;
    task.updatedAt = new Date().toISOString();
    return task;
  }

  public async addWorklog(taskId: string, userId: string, hours: number, description: string) {
    const task = DatabaseContext.tasks.find((t) => t.id === taskId);
    if (!task) throw new NotFoundError('Task not found');

    const worklog: WorklogEntity = {
      id: `wl-${Date.now()}`,
      taskId,
      userId,
      logDate: new Date().toISOString().split('T')[0],
      hours,
      description
    };

    DatabaseContext.worklogs.push(worklog);
    return worklog;
  }
}
