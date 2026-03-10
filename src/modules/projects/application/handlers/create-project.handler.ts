import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, ConflictException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateProjectCommand } from '../commands/create-project.command';
import type { IProjectRepository } from '../../domain/repositories/project.repository.interface';
import { PROJECT_REPOSITORY } from '../../domain/repositories/project.repository.interface';
import type { ITaskStatusRepository } from '../../../tasks/domain/repositories/task-status.repository.interface';
import { TASK_STATUS_REPOSITORY } from '../../../tasks/domain/repositories/task-status.repository.interface';
import { Project } from '../../domain/entities/project.entity';
import { TaskStatus } from '../../../tasks/domain/entities/task-status.entity';

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler implements ICommandHandler<CreateProjectCommand> {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
    @Inject(TASK_STATUS_REPOSITORY)
    private readonly taskStatusRepository: ITaskStatusRepository,
  ) {}

  async execute(command: CreateProjectCommand) {
    const exists = await this.projectRepository.existsBySlugAndOrg(command.slug, command.orgId);
    if (exists) throw new ConflictException('Project slug already taken in this organization');

    const project = Project.create({
      id: uuidv4(),
      orgId: command.orgId,
      name: command.name,
      slug: command.slug,
      description: command.description,
      icon: command.icon,
      color: command.color,
      visibility: command.visibility,
      ownerId: command.createdBy,
      createdBy: command.createdBy,
    });

    const saved = await this.projectRepository.save(project);

    const defaultStatuses = TaskStatus.defaultStatuses(saved.id, command.orgId);
    const statusesWithIds = defaultStatuses.map((s) =>
      TaskStatus.create({ ...s['props'], id: uuidv4() }),
    );
    await this.taskStatusRepository.saveMany(statusesWithIds);

    return {
      id: saved.id,
      orgId: saved.orgId,
      name: saved.name,
      slug: saved.slug,
      description: saved.description,
      icon: saved.icon,
      color: saved.color,
      visibility: saved.visibility,
      status: saved.status,
      ownerId: saved.ownerId,
      createdAt: saved.createdAt,
    };
  }
}
