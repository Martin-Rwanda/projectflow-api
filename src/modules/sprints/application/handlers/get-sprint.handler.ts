import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { GetSprintQuery } from '../queries/get-sprint.query';
import type { ISprintRepository } from '../../domain/repositories/sprint.repository.interface';
import { SPRINT_REPOSITORY } from '../../domain/repositories/sprint.repository.interface';
import type { ISprintTaskAssignmentRepository } from '../../domain/repositories/sprint-task-assignment.repository.interface';
import { SPRINT_TASK_ASSIGNMENT_REPOSITORY } from '../../domain/repositories/sprint-task-assignment.repository.interface';
@QueryHandler(GetSprintQuery)
export class GetSprintHandler implements IQueryHandler<GetSprintQuery> {
  constructor(
    @Inject(SPRINT_REPOSITORY)
    private readonly sprintRepository: ISprintRepository,
    @Inject(SPRINT_TASK_ASSIGNMENT_REPOSITORY)
    private readonly assignmentRepository: ISprintTaskAssignmentRepository,
  ) {}

  async execute(query: GetSprintQuery) {
    const sprint = await this.sprintRepository.findById(query.sprintId, query.orgId);
    if (!sprint) throw new NotFoundException('Sprint not found');

    const assignments = await this.assignmentRepository.findAllBySprint(sprint.id);

    return {
      id: sprint.id,
      projectId: sprint.projectId,
      name: sprint.name,
      goal: sprint.goal,
      status: sprint.status,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      completedAt: sprint.completedAt,
      createdAt: sprint.createdAt,
      tasks: assignments.map((a) => ({ taskId: a.taskId, addedAt: a.addedAt })),
    };
  }
}
