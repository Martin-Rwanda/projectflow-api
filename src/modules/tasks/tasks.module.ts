import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskOrmEntity } from './infrastructure/persistence/typeorm/task.orm-entity';
import { TaskStatusOrmEntity } from './infrastructure/persistence/typeorm/task-status.orm-entity';
import { TaskRepository } from './infrastructure/persistence/typeorm/task.repository';
import { TaskStatusRepository } from './infrastructure/persistence/typeorm/task-status.repository';
import { CreateTaskHandler } from './application/handlers/create-task.handler';
import { UpdateTaskHandler } from './application/handlers/update-task.handler';
import { DeleteTaskHandler } from './application/handlers/delete-task.handler';
import { GetTaskHandler } from './application/handlers/get-task.handler';
import { ListTasksHandler } from './application/handlers/list-tasks.handler';
import { TasksController } from './presentation/tasks.controller';
import { TASK_REPOSITORY } from './domain/repositories/task.repository.interface';
import { TASK_STATUS_REPOSITORY } from './domain/repositories/task-status.repository.interface';
import { OrganizationsModule } from '../organizations/organizations.module';

const CommandHandlers = [CreateTaskHandler, UpdateTaskHandler, DeleteTaskHandler];
const QueryHandlers = [GetTaskHandler, ListTasksHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([TaskOrmEntity, TaskStatusOrmEntity]),
    OrganizationsModule,
  ],
  controllers: [TasksController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    { provide: TASK_REPOSITORY, useClass: TaskRepository },
    { provide: TASK_STATUS_REPOSITORY, useClass: TaskStatusRepository },
  ],
  exports: [TASK_REPOSITORY, TASK_STATUS_REPOSITORY],
})
export class TasksModule {}
