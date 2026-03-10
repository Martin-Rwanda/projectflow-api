export class DeleteCommentCommand {
  constructor(
    public readonly commentId: string,
    public readonly orgId: string,
    public readonly userId: string,
  ) {}
}
