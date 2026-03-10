export interface OrganizationProps {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  planId: string;
  membersCount: number;
  projectsCount: number;
  storageUsedBytes: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Organization {
  private readonly props: OrganizationProps;

  constructor(props: OrganizationProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }
  get name(): string {
    return this.props.name;
  }
  get slug(): string {
    return this.props.slug;
  }
  get logoUrl(): string | null {
    return this.props.logoUrl;
  }
  get planId(): string {
    return this.props.planId;
  }
  get membersCount(): number {
    return this.props.membersCount;
  }
  get projectsCount(): number {
    return this.props.projectsCount;
  }
  get storageUsedBytes(): number {
    return this.props.storageUsedBytes;
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

  incrementMembersCount(): Organization {
    return new Organization({ ...this.props, membersCount: this.props.membersCount + 1 });
  }

  decrementMembersCount(): Organization {
    return new Organization({
      ...this.props,
      membersCount: Math.max(0, this.props.membersCount - 1),
    });
  }

  incrementProjectsCount(): Organization {
    return new Organization({ ...this.props, projectsCount: this.props.projectsCount + 1 });
  }

  updateDetails(name: string, logoUrl: string | null): Organization {
    return new Organization({ ...this.props, name, logoUrl, updatedAt: new Date() });
  }

  static create(
    props: Omit<
      OrganizationProps,
      'createdAt' | 'updatedAt' | 'membersCount' | 'projectsCount' | 'storageUsedBytes'
    >,
  ): Organization {
    return new Organization({
      ...props,
      membersCount: 1,
      projectsCount: 0,
      storageUsedBytes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
