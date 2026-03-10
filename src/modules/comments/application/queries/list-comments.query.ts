export class ListCommentsQuery {
  constructor(
    public readonly taskId: string,
    public readonly orgId: string,
  ) {}
}
