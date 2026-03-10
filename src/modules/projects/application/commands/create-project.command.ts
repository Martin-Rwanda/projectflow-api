import { ProjectVisibility } from '../../domain/entities/project.entity';

export class CreateProjectCommand {
  constructor(
    public readonly orgId: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly description: string | null,
    public readonly icon: string | null,
    public readonly color: string | null,
    public readonly visibility: ProjectVisibility,
    public readonly createdBy: string,
  ) {}
}
