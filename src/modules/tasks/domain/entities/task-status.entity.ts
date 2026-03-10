export type StatusCategory = 'todo' | 'in_progress' | 'done' | 'canceled';

export interface TaskStatusProps {
  id: string;
  projectId: string;
  orgId: string;
  name: string;
  color: string;
  category: StatusCategory;
  position: number;
  isDefault: boolean;
  createdAt: Date;
}

export class TaskStatus {
  private readonly props: TaskStatusProps;

  constructor(props: TaskStatusProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }
  get projectId(): string {
    return this.props.projectId;
  }
  get orgId(): string {
    return this.props.orgId;
  }
  get name(): string {
    return this.props.name;
  }
  get color(): string {
    return this.props.color;
  }
  get category(): StatusCategory {
    return this.props.category;
  }
  get position(): number {
    return this.props.position;
  }
  get isDefault(): boolean {
    return this.props.isDefault;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }

  static create(props: Omit<TaskStatusProps, 'createdAt'>): TaskStatus {
    return new TaskStatus({ ...props, createdAt: new Date() });
  }

  static defaultStatuses(projectId: string, orgId: string): TaskStatus[] {
    const statuses: Array<Omit<TaskStatusProps, 'createdAt'>> = [
      {
        id: '',
        projectId,
        orgId,
        name: 'To Do',
        color: '#6B7280',
        category: 'todo',
        position: 0,
        isDefault: true,
      },
      {
        id: '',
        projectId,
        orgId,
        name: 'In Progress',
        color: '#3B82F6',
        category: 'in_progress',
        position: 1,
        isDefault: false,
      },
      {
        id: '',
        projectId,
        orgId,
        name: 'In Review',
        color: '#F59E0B',
        category: 'in_progress',
        position: 2,
        isDefault: false,
      },
      {
        id: '',
        projectId,
        orgId,
        name: 'Done',
        color: '#10B981',
        category: 'done',
        position: 3,
        isDefault: false,
      },
      {
        id: '',
        projectId,
        orgId,
        name: 'Canceled',
        color: '#EF4444',
        category: 'canceled',
        position: 4,
        isDefault: false,
      },
    ];
    return statuses.map((s) => TaskStatus.create(s));
  }
}
