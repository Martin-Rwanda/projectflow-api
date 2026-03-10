export class CreateSprintCommand {
  constructor(
    public readonly orgId: string,
    public readonly projectId: string,
    public readonly name: string,
    public readonly goal: string | null,
    public readonly createdBy: string,
  ) {}
}
