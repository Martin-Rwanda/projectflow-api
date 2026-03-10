import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListProjectsQuery } from '../queries/list-projects.query';
import type { IProjectRepository } from '../../domain/repositories/project.repository.interface';
import { PROJECT_REPOSITORY } from '../../domain/repositories/project.repository.interface';
@QueryHandler(ListProjectsQuery)
export class ListProjectsHandler implements IQueryHandler<ListProjectsQuery> {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(query: ListProjectsQuery) {
    const projects = await this.projectRepository.findAllByOrg(query.orgId);
    return projects.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      icon: p.icon,
      color: p.color,
      visibility: p.visibility,
      status: p.status,
      ownerId: p.ownerId,
      createdAt: p.createdAt,
    }));
  }
}
