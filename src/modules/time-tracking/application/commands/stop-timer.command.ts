export class StopTimerCommand {
  constructor(
    public readonly userId: string,
    public readonly orgId: string,
  ) {}
}
