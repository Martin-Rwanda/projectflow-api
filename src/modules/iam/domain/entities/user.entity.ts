export interface UserProps {
  id: string;
  email: string;
  passwordHash: string | null;
  fullName: string;
  avatarUrl: string | null;
  emailVerifiedAt: Date | null;
  mfaEnabled: boolean;
  mfaSecret: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class User {
  private readonly props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }
  get email(): string {
    return this.props.email;
  }
  get passwordHash(): string | null {
    return this.props.passwordHash;
  }
  get fullName(): string {
    return this.props.fullName;
  }
  get avatarUrl(): string | null {
    return this.props.avatarUrl;
  }
  get emailVerifiedAt(): Date | null {
    return this.props.emailVerifiedAt;
  }
  get mfaEnabled(): boolean {
    return this.props.mfaEnabled;
  }
  get mfaSecret(): string | null {
    return this.props.mfaSecret;
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

  get isEmailVerified(): boolean {
    return this.props.emailVerifiedAt !== null;
  }

  verifyEmail(): User {
    return new User({ ...this.props, emailVerifiedAt: new Date() });
  }

  enableMfa(secret: string): User {
    return new User({ ...this.props, mfaEnabled: true, mfaSecret: secret });
  }

  disableMfa(): User {
    return new User({ ...this.props, mfaEnabled: false, mfaSecret: null });
  }

  updateProfile(fullName: string, avatarUrl: string | null): User {
    return new User({ ...this.props, fullName, avatarUrl, updatedAt: new Date() });
  }

  static create(props: Omit<UserProps, 'createdAt' | 'updatedAt' | 'deletedAt'>): User {
    return new User({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  }
}
