export interface ReactionProps {
  id: string;
  commentId: string;
  userId: string;
  emoji: string;
  createdAt: Date;
}

export class Reaction {
  private readonly props: ReactionProps;

  constructor(props: ReactionProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }
  get commentId(): string {
    return this.props.commentId;
  }
  get userId(): string {
    return this.props.userId;
  }
  get emoji(): string {
    return this.props.emoji;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }

  static create(props: Omit<ReactionProps, 'createdAt'>): Reaction {
    return new Reaction({ ...props, createdAt: new Date() });
  }
}
