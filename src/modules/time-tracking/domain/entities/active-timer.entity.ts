export interface ActiveTimerProps {
  id: string;
  userId: string;
  orgId: string;
  taskId: string;
  timeEntryId: string;
  startedAt: Date;
}

export class ActiveTimer {
  private readonly props: ActiveTimerProps;

  constructor(props: ActiveTimerProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }
  get userId(): string {
    return this.props.userId;
  }
  get orgId(): string {
    return this.props.orgId;
  }
  get taskId(): string {
    return this.props.taskId;
  }
  get timeEntryId(): string {
    return this.props.timeEntryId;
  }
  get startedAt(): Date {
    return this.props.startedAt;
  }

  get elapsedSeconds(): number {
    return Math.floor((new Date().getTime() - this.props.startedAt.getTime()) / 1000);
  }

  static create(props: ActiveTimerProps): ActiveTimer {
    return new ActiveTimer(props);
  }
}
