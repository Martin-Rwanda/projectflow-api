import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SprintOrmEntity } from './infrastructure/persistence/typeorm/sprint.orm-entity';
import { SprintTaskAssignmentOrmEntity } from './infrastructure/persistence/typeorm/sprint-task-assignment.orm-entity';
import { SprintRepository } from './infrastructure/persistence/typeorm/sprint.repository';
import { SprintTaskAssignmentRepository } from './infrastructure/persistence/typeorm/sprint-task-assignment.repository';
import { CreateSprintHandler } from './application/handlers/create-sprint.handler';
import { StartSprintHandler } from './application/handlers/start-sprint.handler';
import { CompleteSprintHandler } from './application/handlers/complete-sprint.handler';
import { AddTaskToSprintHandler } from './application/handlers/add-task-to-sprint.handler';
import { RemoveTaskFromSprintHandler } from './application/handlers/remove-task-from-sprint.handler';
import { GetSprintHandler } from './application/handlers/get-sprint.handler';
import { ListSprintsHandler } from './application/handlers/list-sprints.handler';
import { SprintsController } from './presentation/sprints.controller';
import { SPRINT_REPOSITORY } from './domain/repositories/sprint.repository.interface';
import { SPRINT_TASK_ASSIGNMENT_REPOSITORY } from './domain/repositories/sprint-task-assignment.repository.interface';
import { OrganizationsModule } from '../organizations/organizations.module';

const CommandHandlers = [
  CreateSprintHandler,
  StartSprintHandler,
  CompleteSprintHandler,
  AddTaskToSprintHandler,
  RemoveTaskFromSprintHandler,
];

const QueryHandlers = [GetSprintHandler, ListSprintsHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([SprintOrmEntity, SprintTaskAssignmentOrmEntity]),
    OrganizationsModule,
  ],
  controllers: [SprintsController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    { provide: SPRINT_REPOSITORY, useClass: SprintRepository },
    { provide: SPRINT_TASK_ASSIGNMENT_REPOSITORY, useClass: SprintTaskAssignmentRepository },
  ],
  exports: [SPRINT_REPOSITORY, SPRINT_TASK_ASSIGNMENT_REPOSITORY],
})
export class SprintsModule {}
