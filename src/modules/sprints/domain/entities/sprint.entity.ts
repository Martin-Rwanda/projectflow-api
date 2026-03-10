export type SprintStatus = 'planning' | 'active' | 'completed';

export interface SprintProps {
  id: string;
  orgId: string;
  projectId: string;
  name: string;
  goal: string | null;
  status: SprintStatus;
  startDate: Date | null;
  endDate: Date | null;
  createdBy: string;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Sprint {
  private readonly props: SprintProps;

  constructor(props: SprintProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }
  get orgId(): string {
    return this.props.orgId;
  }
  get projectId(): string {
    return this.props.projectId;
  }
  get name(): string {
    return this.props.name;
  }
  get goal(): string | null {
    return this.props.goal;
  }
  get status(): SprintStatus {
    return this.props.status;
  }
  get startDate(): Date | null {
    return this.props.startDate;
  }
  get endDate(): Date | null {
    return this.props.endDate;
  }
  get createdBy(): string {
    return this.props.createdBy;
  }
  get completedAt(): Date | null {
    return this.props.completedAt;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get isPlanning(): boolean {
    return this.props.status === 'planning';
  }
  get isActive(): boolean {
    return this.props.status === 'active';
  }
  get isCompleted(): boolean {
    return this.props.status === 'completed';
  }

  start(startDate: Date, endDate: Date): Sprint {
    return new Sprint({
      ...this.props,
      status: 'active',
      startDate,
      endDate,
      updatedAt: new Date(),
    });
  }

  complete(): Sprint {
    return new Sprint({
      ...this.props,
      status: 'completed',
      completedAt: new Date(),
      updatedAt: new Date(),
    });
  }

  updateDetails(name: string, goal: string | null): Sprint {
    return new Sprint({ ...this.props, name, goal, updatedAt: new Date() });
  }

  static create(
    props: Omit<SprintProps, 'createdAt' | 'updatedAt' | 'completedAt' | 'status'>,
  ): Sprint {
    return new Sprint({
      ...props,
      status: 'planning',
      completedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
