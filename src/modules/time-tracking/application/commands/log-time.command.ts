export class LogTimeCommand {
  constructor(
    public readonly userId: string,
    public readonly orgId: string,
    public readonly taskId: string,
    public readonly startedAt: Date,
    public readonly endedAt: Date,
    public readonly description: string | null,
  ) {}
}
