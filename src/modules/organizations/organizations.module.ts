import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationOrmEntity } from './infrastructure/persistence/typeorm/organization.orm-entity';
import { OrganizationMemberOrmEntity } from './infrastructure/persistence/typeorm/organization-member.orm-entity';
import { InvitationOrmEntity } from './infrastructure/persistence/typeorm/invitation.orm-entity';
import { OrganizationRepository } from './infrastructure/persistence/typeorm/organization.repository';
import { OrganizationMemberRepository } from './infrastructure/persistence/typeorm/organization-member.repository';
import { InvitationRepository } from './infrastructure/persistence/typeorm/invitation.repository';
import { CreateOrganizationHandler } from './application/handlers/create-organization.handler';
import { InviteMemberHandler } from './application/handlers/invite-member.handler';
import { AcceptInvitationHandler } from './application/handlers/accept-invitation.handler';
import { GetOrganizationHandler } from './application/handlers/get-organization.handler';
import { OrganizationsController } from './presentation/organizations.controller';
import { ORGANIZATION_REPOSITORY } from './domain/repositories/organization.repository.interface';
import { ORGANIZATION_MEMBER_REPOSITORY } from './domain/repositories/organization-member.repository.interface';
import { INVITATION_REPOSITORY } from './domain/repositories/invitation.repository.interface';

const CommandHandlers = [CreateOrganizationHandler, InviteMemberHandler, AcceptInvitationHandler];

const QueryHandlers = [GetOrganizationHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      OrganizationOrmEntity,
      OrganizationMemberOrmEntity,
      InvitationOrmEntity,
    ]),
  ],
  controllers: [OrganizationsController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    { provide: ORGANIZATION_REPOSITORY, useClass: OrganizationRepository },
    { provide: ORGANIZATION_MEMBER_REPOSITORY, useClass: OrganizationMemberRepository },
    { provide: INVITATION_REPOSITORY, useClass: InvitationRepository },
  ],
  exports: [ORGANIZATION_REPOSITORY, ORGANIZATION_MEMBER_REPOSITORY, INVITATION_REPOSITORY],
})
export class OrganizationsModule {}
