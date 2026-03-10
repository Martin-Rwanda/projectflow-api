export class ListSprintsQuery {
  constructor(
    public readonly projectId: string,
    public readonly orgId: string,
  ) {}
}
