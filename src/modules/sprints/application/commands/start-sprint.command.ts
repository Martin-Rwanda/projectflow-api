export class StartSprintCommand {
  constructor(
    public readonly sprintId: string,
    public readonly orgId: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
  ) {}
}
