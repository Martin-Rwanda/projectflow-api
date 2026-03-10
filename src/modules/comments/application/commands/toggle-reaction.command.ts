export class ToggleReactionCommand {
  constructor(
    public readonly commentId: string,
    public readonly userId: string,
    public readonly emoji: string,
  ) {}
}
