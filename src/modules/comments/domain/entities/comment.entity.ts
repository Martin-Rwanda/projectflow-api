export interface CommentProps {
  id: string;
  orgId: string;
  taskId: string;
  authorId: string;
  body: object;
  isEdited: boolean;
  parentCommentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Comment {
  private readonly props: CommentProps;

  constructor(props: CommentProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }
  get orgId(): string {
    return this.props.orgId;
  }
  get taskId(): string {
    return this.props.taskId;
  }
  get authorId(): string {
    return this.props.authorId;
  }
  get body(): object {
    return this.props.body;
  }
  get isEdited(): boolean {
    return this.props.isEdited;
  }
  get parentCommentId(): string | null {
    return this.props.parentCommentId;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }
  get deletedAt(): Date | null {
    return this.props.deletedAt;
  }

  edit(body: object): Comment {
    return new Comment({ ...this.props, body, isEdited: true, updatedAt: new Date() });
  }

  softDelete(): Comment {
    return new Comment({ ...this.props, deletedAt: new Date() });
  }

  static create(
    props: Omit<CommentProps, 'createdAt' | 'updatedAt' | 'deletedAt' | 'isEdited'>,
  ): Comment {
    return new Comment({
      ...props,
      isEdited: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  }
}
