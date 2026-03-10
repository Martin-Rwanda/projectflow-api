import { OrgRole } from '../../domain/entities/organization-member.entity';

export class InviteMemberCommand {
  constructor(
    public readonly orgId: string,
    public readonly email: string,
    public readonly role: Exclude<OrgRole, 'owner'>,
    public readonly invitedBy: string,
  ) {}
}
