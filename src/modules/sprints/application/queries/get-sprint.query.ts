export class GetSprintQuery {
  constructor(
    public readonly sprintId: string,
    public readonly orgId: string,
  ) {}
}
