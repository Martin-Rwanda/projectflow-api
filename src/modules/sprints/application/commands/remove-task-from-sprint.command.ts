export class RemoveTaskFromSprintCommand {
  constructor(
    public readonly sprintId: string,
    public readonly taskId: string,
    public readonly orgId: string,
  ) {}
}
