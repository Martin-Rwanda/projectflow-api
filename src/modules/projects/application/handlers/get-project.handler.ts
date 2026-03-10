import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { GetProjectQuery } from '../queries/get-project.query';
import type { IProjectRepository } from '../../domain/repositories/project.repository.interface';
import { PROJECT_REPOSITORY } from '../../domain/repositories/project.repository.interface';
import type { ITaskStatusRepository } from '../../../tasks/domain/repositories/task-status.repository.interface';
import { TASK_STATUS_REPOSITORY } from '../../../tasks/domain/repositories/task-status.repository.interface';

@QueryHandler(GetProjectQuery)
export class GetProjectHandler implements IQueryHandler<GetProjectQuery> {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
    @Inject(TASK_STATUS_REPOSITORY)
    private readonly taskStatusRepository: ITaskStatusRepository,
  ) {}

  async execute(query: GetProjectQuery) {
    const project = await this.projectRepository.findById(query.projectId);
    if (!project || project.orgId !== query.orgId) {
      throw new NotFoundException('Project not found');
    }

    const statuses = await this.taskStatusRepository.findByProject(project.id);

    return {
      id: project.id,
      orgId: project.orgId,
      name: project.name,
      slug: project.slug,
      description: project.description,
      icon: project.icon,
      color: project.color,
      visibility: project.visibility,
      status: project.status,
      ownerId: project.ownerId,
      createdAt: project.createdAt,
      statuses: statuses.map((s) => ({
        id: s.id,
        name: s.name,
        color: s.color,
        category: s.category,
        position: s.position,
        isDefault: s.isDefault,
      })),
    };
  }
}
