export interface SprintTaskAssignmentProps {
  id: string;
  sprintId: string;
  taskId: string;
  addedBy: string;
  addedAt: Date;
}

export class SprintTaskAssignment {
  private readonly props: SprintTaskAssignmentProps;

  constructor(props: SprintTaskAssignmentProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }
  get sprintId(): string {
    return this.props.sprintId;
  }
  get taskId(): string {
    return this.props.taskId;
  }
  get addedBy(): string {
    return this.props.addedBy;
  }
  get addedAt(): Date {
    return this.props.addedAt;
  }

  static create(props: Omit<SprintTaskAssignmentProps, 'addedAt'>): SprintTaskAssignment {
    return new SprintTaskAssignment({ ...props, addedAt: new Date() });
  }
}
