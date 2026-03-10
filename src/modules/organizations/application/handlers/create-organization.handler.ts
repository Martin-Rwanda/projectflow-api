import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, ConflictException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrganizationCommand } from '../commands/create-organization.command';
import type { IOrganizationRepository } from '../../domain/repositories/organization.repository.interface';
import { ORGANIZATION_REPOSITORY } from '../../domain/repositories/organization.repository.interface';
import type { IOrganizationMemberRepository } from '../../domain/repositories/organization-member.repository.interface';
import { ORGANIZATION_MEMBER_REPOSITORY } from '../../domain/repositories/organization-member.repository.interface';
import { Organization } from '../../domain/entities/organization.entity';
import { OrganizationMember } from '../../domain/entities/organization-member.entity';

@CommandHandler(CreateOrganizationCommand)
export class CreateOrganizationHandler implements ICommandHandler<CreateOrganizationCommand> {
  constructor(
    @Inject(ORGANIZATION_REPOSITORY)
    private readonly orgRepository: IOrganizationRepository,
    @Inject(ORGANIZATION_MEMBER_REPOSITORY)
    private readonly memberRepository: IOrganizationMemberRepository,
  ) {}

  async execute(command: CreateOrganizationCommand) {
    const exists = await this.orgRepository.existsBySlug(command.slug);
    if (exists) throw new ConflictException('Organization slug already taken');

    const org = Organization.create({
      id: uuidv4(),
      name: command.name,
      slug: command.slug,
      logoUrl: null,
      planId: 'free',
      createdBy: command.createdBy,
    });

    const saved = await this.orgRepository.save(org);

    const member = OrganizationMember.create({
      id: uuidv4(),
      orgId: saved.id,
      userId: command.createdBy,
      role: 'owner',
      status: 'active',
      invitedBy: null,
      joinedAt: new Date(),
    });

    await this.memberRepository.save(member);

    return saved;
  }
}
