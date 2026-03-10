import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListSprintsQuery } from '../queries/list-sprints.query';
import type { ISprintRepository } from '../../domain/repositories/sprint.repository.interface';
import { SPRINT_REPOSITORY } from '../../domain/repositories/sprint.repository.interface';

@QueryHandler(ListSprintsQuery)
export class ListSprintsHandler implements IQueryHandler<ListSprintsQuery> {
  constructor(
    @Inject(SPRINT_REPOSITORY)
    private readonly sprintRepository: ISprintRepository,
  ) {}

  async execute(query: ListSprintsQuery) {
    const sprints = await this.sprintRepository.findAllByProject(query.projectId, query.orgId);
    return sprints.map((s) => ({
      id: s.id,
      name: s.name,
      goal: s.goal,
      status: s.status,
      startDate: s.startDate,
      endDate: s.endDate,
      completedAt: s.completedAt,
      createdAt: s.createdAt,
    }));
  }
}
