export interface TimeEntryProps {
  id: string;
  orgId: string;
  taskId: string;
  userId: string;
  description: string | null;
  startedAt: Date;
  endedAt: Date | null;
  durationSeconds: number | null;
  isRunning: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class TimeEntry {
  private readonly props: TimeEntryProps;

  constructor(props: TimeEntryProps) {
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
  get userId(): string {
    return this.props.userId;
  }
  get description(): string | null {
    return this.props.description;
  }
  get startedAt(): Date {
    return this.props.startedAt;
  }
  get endedAt(): Date | null {
    return this.props.endedAt;
  }
  get durationSeconds(): number | null {
    return this.props.durationSeconds;
  }
  get isRunning(): boolean {
    return this.props.isRunning;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  stop(endedAt: Date): TimeEntry {
    const durationSeconds = Math.floor((endedAt.getTime() - this.props.startedAt.getTime()) / 1000);
    return new TimeEntry({
      ...this.props,
      endedAt,
      durationSeconds,
      isRunning: false,
      updatedAt: new Date(),
    });
  }

  static create(
    props: Omit<
      TimeEntryProps,
      'createdAt' | 'updatedAt' | 'durationSeconds' | 'isRunning' | 'endedAt'
    >,
  ): TimeEntry {
    return new TimeEntry({
      ...props,
      endedAt: null,
      durationSeconds: null,
      isRunning: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static createManual(
    props: Omit<TimeEntryProps, 'createdAt' | 'updatedAt' | 'isRunning'> & {
      startedAt: Date;
      endedAt: Date;
    },
  ): TimeEntry {
    const durationSeconds = Math.floor(
      (props.endedAt.getTime() - props.startedAt.getTime()) / 1000,
    );
    return new TimeEntry({
      ...props,
      durationSeconds,
      isRunning: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
