export class CreateCommentCommand {
  constructor(
    public readonly orgId: string,
    public readonly taskId: string,
    public readonly authorId: string,
    public readonly body: object,
    public readonly parentCommentId: string | null,
  ) {}
}
