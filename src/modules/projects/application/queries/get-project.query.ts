export class GetProjectQuery {
  constructor(
    public readonly projectId: string,
    public readonly orgId: string,
  ) {}
}
