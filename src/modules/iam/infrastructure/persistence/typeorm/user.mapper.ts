import { User } from '../../../domain/entities/user.entity';
import { UserOrmEntity } from './user.orm-entity';

export class UserMapper {
  static toDomain(orm: UserOrmEntity): User {
    return new User({
      id: orm.id,
      email: orm.email,
      passwordHash: orm.passwordHash,
      fullName: orm.fullName,
      avatarUrl: orm.avatarUrl,
      emailVerifiedAt: orm.emailVerifiedAt,
      mfaEnabled: orm.mfaEnabled,
      mfaSecret: orm.mfaSecret,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      deletedAt: orm.deletedAt,
    });
  }

  static toOrm(domain: User): UserOrmEntity {
    const orm = new UserOrmEntity();
    orm.id = domain.id;
    orm.email = domain.email;
    orm.passwordHash = domain.passwordHash;
    orm.fullName = domain.fullName;
    orm.avatarUrl = domain.avatarUrl;
    orm.emailVerifiedAt = domain.emailVerifiedAt;
    orm.mfaEnabled = domain.mfaEnabled;
    orm.mfaSecret = domain.mfaSecret;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    orm.deletedAt = domain.deletedAt;
    return orm;
  }
}
