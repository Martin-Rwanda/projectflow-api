import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infrastructure/persistence/typeorm/user.orm-entity';
import { UserRepository } from './infrastructure/persistence/typeorm/user.repository';
import { TokenService } from './infrastructure/services/token.service';
import { HashService } from './infrastructure/services/hash.service';
import { JwtStrategy } from './infrastructure/services/jwt.strategy';
import { RegisterUserHandler } from './application/handlers/register-user.handler';
import { LoginUserHandler } from './application/handlers/login-user.handler';
import { AuthController } from './presentation/auth.controller';
import { USER_REPOSITORY } from './domain/repositories/user.repository.interface';

const CommandHandlers = [RegisterUserHandler, LoginUserHandler];

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserOrmEntity]),
  ],
  controllers: [AuthController],
  providers: [
    ...CommandHandlers,
    TokenService,
    HashService,
    JwtStrategy,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [TokenService, HashService, USER_REPOSITORY],
})
export class IamModule {}
