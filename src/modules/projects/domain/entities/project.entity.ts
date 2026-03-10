export type ProjectVisibility = 'public_to_org' | 'private';
export type ProjectStatus = 'active' | 'archived';

export interface ProjectProps {
  id: string;
  orgId: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  visibility: ProjectVisibility;
  status: ProjectStatus;
  ownerId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Project {
  private readonly props: ProjectProps;

  constructor(props: ProjectProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }
  get orgId(): string {
    return this.props.orgId;
  }
  get name(): string {
    return this.props.name;
  }
  get slug(): string {
    return this.props.slug;
  }
  get description(): string | null {
    return this.props.description;
  }
  get icon(): string | null {
    return this.props.icon;
  }
  get color(): string | null {
    return this.props.color;
  }
  get visibility(): ProjectVisibility {
    return this.props.visibility;
  }
  get status(): ProjectStatus {
    return this.props.status;
  }
  get ownerId(): string {
    return this.props.ownerId;
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

  get isArchived(): boolean {
    return this.props.status === 'archived';
  }

  archive(): Project {
    return new Project({ ...this.props, status: 'archived', updatedAt: new Date() });
  }

  unarchive(): Project {
    return new Project({ ...this.props, status: 'active', updatedAt: new Date() });
  }

  updateDetails(
    name: string,
    description: string | null,
    icon: string | null,
    color: string | null,
  ): Project {
    return new Project({ ...this.props, name, description, icon, color, updatedAt: new Date() });
  }

  static create(props: Omit<ProjectProps, 'createdAt' | 'updatedAt' | 'status'>): Project {
    return new Project({
      ...props,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
