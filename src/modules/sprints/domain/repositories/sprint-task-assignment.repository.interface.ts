import { SprintTaskAssignment } from '../entities/sprint-task-assignment.entity';

export const SPRINT_TASK_ASSIGNMENT_REPOSITORY = Symbol('ISprintTaskAssignmentRepository');

export interface ISprintTaskAssignmentRepository {
  findBySprintAndTask(sprintId: string, taskId: string): Promise<SprintTaskAssignment | null>;
  findAllBySprint(sprintId: string): Promise<SprintTaskAssignment[]>;
  save(assignment: SprintTaskAssignment): Promise<SprintTaskAssignment>;
  delete(sprintId: string, taskId: string): Promise<void>;
}
