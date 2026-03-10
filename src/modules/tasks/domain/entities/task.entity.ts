export type TaskPriority = 'none' | 'low' | 'medium' | 'high' | 'urgent';

export interface TaskProps {
  id: string;
  orgId: string;
  projectId: string;
  title: string;
  description: object | null;
  statusId: string;
  priority: TaskPriority;
  assigneeId: string | null;
  reporterId: string;
  parentTaskId: string | null;
  order: number;
  dueDate: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;
  estimatedHours: number | null;
  loggedHours: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Task {
  private readonly props: TaskProps;

  constructor(props: TaskProps) {
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
  get title(): string {
    return this.props.title;
  }
  get description(): object | null {
    return this.props.description;
  }
  get statusId(): string {
    return this.props.statusId;
  }
  get priority(): TaskPriority {
    return this.props.priority;
  }
  get assigneeId(): string | null {
    return this.props.assigneeId;
  }
  get reporterId(): string {
    return this.props.reporterId;
  }
  get parentTaskId(): string | null {
    return this.props.parentTaskId;
  }
  get order(): number {
    return this.props.order;
  }
  get dueDate(): Date | null {
    return this.props.dueDate;
  }
  get startedAt(): Date | null {
    return this.props.startedAt;
  }
  get completedAt(): Date | null {
    return this.props.completedAt;
  }
  get estimatedHours(): number | null {
    return this.props.estimatedHours;
  }
  get loggedHours(): number {
    return this.props.loggedHours;
  }
  get createdBy(): string {
    return this.props.createdBy;
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

  assign(assigneeId: string): Task {
    return new Task({ ...this.props, assigneeId, updatedAt: new Date() });
  }

  unassign(): Task {
    return new Task({ ...this.props, assigneeId: null, updatedAt: new Date() });
  }

  changeStatus(statusId: string): Task {
    return new Task({ ...this.props, statusId, updatedAt: new Date() });
  }

  changePriority(priority: TaskPriority): Task {
    return new Task({ ...this.props, priority, updatedAt: new Date() });
  }

  updateDetails(
    title: string,
    description: object | null,
    dueDate: Date | null,
    estimatedHours: number | null,
  ): Task {
    return new Task({
      ...this.props,
      title,
      description,
      dueDate,
      estimatedHours,
      updatedAt: new Date(),
    });
  }

  reorder(order: number): Task {
    return new Task({ ...this.props, order, updatedAt: new Date() });
  }

  softDelete(): Task {
    return new Task({ ...this.props, deletedAt: new Date() });
  }

  static create(
    props: Omit<TaskProps, 'createdAt' | 'updatedAt' | 'deletedAt' | 'loggedHours'>,
  ): Task {
    return new Task({
      ...props,
      loggedHours: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  }
}
