import { OrgRole } from './organization-member.entity';

export interface InvitationProps {
  id: string;
  orgId: string;
  email: string;
  role: OrgRole;
  token: string;
  invitedBy: string;
  expiresAt: Date;
  acceptedAt: Date | null;
  createdAt: Date;
}

export class Invitation {
  private readonly props: InvitationProps;

  constructor(props: InvitationProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }
  get orgId(): string {
    return this.props.orgId;
  }
  get email(): string {
    return this.props.email;
  }
  get role(): OrgRole {
    return this.props.role;
  }
  get token(): string {
    return this.props.token;
  }
  get invitedBy(): string {
    return this.props.invitedBy;
  }
  get expiresAt(): Date {
    return this.props.expiresAt;
  }
  get acceptedAt(): Date | null {
    return this.props.acceptedAt;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }

  get isExpired(): boolean {
    return new Date() > this.props.expiresAt;
  }
  get isAccepted(): boolean {
    return this.props.acceptedAt !== null;
  }

  accept(): Invitation {
    return new Invitation({ ...this.props, acceptedAt: new Date() });
  }

  static create(
    props: Omit<InvitationProps, 'createdAt' | 'acceptedAt' | 'expiresAt'>,
  ): Invitation {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    return new Invitation({ ...props, acceptedAt: null, expiresAt, createdAt: new Date() });
  }
}
