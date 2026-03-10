import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AcceptInvitationCommand } from '../commands/accept-invitation.command';
import type { IInvitationRepository } from '../../domain/repositories/invitation.repository.interface';
import { INVITATION_REPOSITORY } from '../../domain/repositories/invitation.repository.interface';
import type { IOrganizationMemberRepository } from '../../domain/repositories/organization-member.repository.interface';
import { ORGANIZATION_MEMBER_REPOSITORY } from '../../domain/repositories/organization-member.repository.interface';
import type { IOrganizationRepository } from '../../domain/repositories/organization.repository.interface';
import { ORGANIZATION_REPOSITORY } from '../../domain/repositories/organization.repository.interface';
import { OrganizationMember } from '../../domain/entities/organization-member.entity';

@CommandHandler(AcceptInvitationCommand)
export class AcceptInvitationHandler implements ICommandHandler<AcceptInvitationCommand> {
  constructor(
    @Inject(INVITATION_REPOSITORY)
    private readonly invitationRepository: IInvitationRepository,
    @Inject(ORGANIZATION_MEMBER_REPOSITORY)
    private readonly memberRepository: IOrganizationMemberRepository,
    @Inject(ORGANIZATION_REPOSITORY)
    private readonly orgRepository: IOrganizationRepository,
  ) {}

  async execute(command: AcceptInvitationCommand) {
    const invitation = await this.invitationRepository.findByToken(command.token);
    if (!invitation) throw new NotFoundException('Invitation not found');
    if (invitation.isExpired) throw new BadRequestException('Invitation has expired');
    if (invitation.isAccepted) throw new BadRequestException('Invitation already accepted');

    const member = OrganizationMember.create({
      id: uuidv4(),
      orgId: invitation.orgId,
      userId: command.userId,
      role: invitation.role,
      status: 'active',
      invitedBy: invitation.invitedBy,
      joinedAt: new Date(),
    });

    // Check if already a member
    const existingMember = await this.memberRepository.findByOrgAndUser(
      invitation.orgId,
      command.userId,
    );
    if (existingMember) {
      throw new ConflictException('User is already a member of this organization');
    }

    await this.memberRepository.save(member);
    await this.invitationRepository.update(invitation.accept());

    const org = await this.orgRepository.findById(invitation.orgId);
    if (org) await this.orgRepository.update(org.incrementMembersCount());

    return { message: 'Invitation accepted successfully' };
  }
}
