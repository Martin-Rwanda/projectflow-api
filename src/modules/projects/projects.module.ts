import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectOrmEntity } from './infrastructure/persistence/typeorm/project.orm-entity';
import { ProjectRepository } from './infrastructure/persistence/typeorm/project.repository';
import { CreateProjectHandler } from './application/handlers/create-project.handler';
import { GetProjectHandler } from './application/handlers/get-project.handler';
import { ListProjectsHandler } from './application/handlers/list-projects.handler';
import { ProjectsController } from './presentation/projects.controller';
import { PROJECT_REPOSITORY } from './domain/repositories/project.repository.interface';
import { TasksModule } from '../tasks/tasks.module';
import { OrganizationsModule } from '../organizations/organizations.module';

const CommandHandlers = [CreateProjectHandler];
const QueryHandlers = [GetProjectHandler, ListProjectsHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ProjectOrmEntity]),
    TasksModule,
    OrganizationsModule,
  ],
  controllers: [ProjectsController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    { provide: PROJECT_REPOSITORY, useClass: ProjectRepository },
  ],
  exports: [PROJECT_REPOSITORY],
})
export class ProjectsModule {}
