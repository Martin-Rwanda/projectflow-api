import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, ConflictException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { RegisterUserCommand } from '../commands/register-user.command';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import { HashService } from '../../infrastructure/services/hash.service';
import { TokenService } from '../../infrastructure/services/token.service';
import { Email } from '../../domain/value-objects/email.vo';
import { Password } from '../../domain/value-objects/password.vo';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(command: RegisterUserCommand) {
    const email = new Email(command.email);
    Password.create(command.password);

    const exists = await this.userRepository.existsByEmail(email.toString());
    if (exists) {
      throw new ConflictException('Email already in use');
    }

    const passwordHash = await this.hashService.hash(command.password);

    const user = User.create({
      id: uuidv4(),
      email: email.toString(),
      passwordHash,
      fullName: command.fullName,
      avatarUrl: null,
      emailVerifiedAt: null,
      mfaEnabled: false,
      mfaSecret: null,
    });

    const saved = await this.userRepository.save(user);

    const accessToken = this.tokenService.generateAccessToken({
      sub: saved.id,
      email: saved.email,
    });

    const refreshToken = this.tokenService.generateRefreshToken(saved.id, uuidv4());

    return {
      accessToken,
      refreshToken,
      user: {
        id: saved.id,
        email: saved.email,
        fullName: saved.fullName,
        avatarUrl: saved.avatarUrl,
      },
    };
  }
}
