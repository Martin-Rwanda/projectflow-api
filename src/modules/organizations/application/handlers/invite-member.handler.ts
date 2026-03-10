import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, ConflictException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InviteMemberCommand } from '../commands/invite-member.command';
import type { IInvitationRepository } from '../../domain/repositories/invitation.repository.interface';
import { INVITATION_REPOSITORY } from '../../domain/repositories/invitation.repository.interface';
import { Invitation } from '../../domain/entities/invitation.entity';

@CommandHandler(InviteMemberCommand)
export class InviteMemberHandler implements ICommandHandler<InviteMemberCommand> {
  constructor(
    @Inject(INVITATION_REPOSITORY)
    private readonly invitationRepository: IInvitationRepository,
  ) {}

  async execute(command: InviteMemberCommand) {
    const existing = await this.invitationRepository.findByOrgAndEmail(
      command.orgId,
      command.email,
    );

    if (existing && !existing.isExpired && !existing.isAccepted) {
      throw new ConflictException('Invitation already sent to this email');
    }

    const invitation = Invitation.create({
      id: uuidv4(),
      orgId: command.orgId,
      email: command.email,
      role: command.role,
      token: uuidv4(),
      invitedBy: command.invitedBy,
    });

    return this.invitationRepository.save(invitation);
  }
}
