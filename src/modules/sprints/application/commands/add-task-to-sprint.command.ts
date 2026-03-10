export class AddTaskToSprintCommand {
  constructor(
    public readonly sprintId: string,
    public readonly taskId: string,
    public readonly orgId: string,
    public readonly addedBy: string,
  ) {}
}
