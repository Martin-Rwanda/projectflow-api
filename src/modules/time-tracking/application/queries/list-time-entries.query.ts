export class ListTimeEntriesQuery {
  constructor(
    public readonly orgId: string,
    public readonly taskId?: string,
    public readonly userId?: string,
  ) {}
}
