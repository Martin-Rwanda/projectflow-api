export class DeleteTaskCommand {
  constructor(
    public readonly id: string,
    public readonly orgId: string,
  ) {}
}
