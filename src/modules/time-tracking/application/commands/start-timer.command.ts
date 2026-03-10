export class StartTimerCommand {
  constructor(
    public readonly userId: string,
    public readonly orgId: string,
    public readonly taskId: string,
    public readonly description: string | null,
  ) {}
}
