export class CompleteSprintCommand {
  constructor(
    public readonly sprintId: string,
    public readonly orgId: string,
  ) {}
}
