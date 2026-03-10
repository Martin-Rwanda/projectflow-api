export type OrgRole = 'owner' | 'admin' | 'member' | 'guest';
export type MemberStatus = 'active' | 'invited' | 'suspended';

export interface OrganizationMemberProps {
  id: string;
  orgId: string;
  userId: string;
  role: OrgRole;
  status: MemberStatus;
  invitedBy: string | null;
  joinedAt: Date | null;
  createdAt: Date;
}

export class OrganizationMember {
  private readonly props: OrganizationMemberProps;

  constructor(props: OrganizationMemberProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }
  get orgId(): string {
    return this.props.orgId;
  }
  get userId(): string {
    return this.props.userId;
  }
  get role(): OrgRole {
    return this.props.role;
  }
  get status(): MemberStatus {
    return this.props.status;
  }
  get invitedBy(): string | null {
    return this.props.invitedBy;
  }
  get joinedAt(): Date | null {
    return this.props.joinedAt;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }

  get isActive(): boolean {
    return this.props.status === 'active';
  }
  get isOwner(): boolean {
    return this.props.role === 'owner';
  }
  get isAdmin(): boolean {
    return this.props.role === 'admin' || this.props.role === 'owner';
  }

  activate(): OrganizationMember {
    return new OrganizationMember({ ...this.props, status: 'active', joinedAt: new Date() });
  }

  changeRole(role: OrgRole): OrganizationMember {
    return new OrganizationMember({ ...this.props, role });
  }

  suspend(): OrganizationMember {
    return new OrganizationMember({ ...this.props, status: 'suspended' });
  }

  static create(props: Omit<OrganizationMemberProps, 'createdAt'>): OrganizationMember {
    return new OrganizationMember({ ...props, createdAt: new Date() });
  }
}
