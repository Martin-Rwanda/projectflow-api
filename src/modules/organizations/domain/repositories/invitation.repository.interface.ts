import { Invitation } from '../entities/invitation.entity';

export const INVITATION_REPOSITORY = Symbol('IInvitationRepository');

export interface IInvitationRepository {
  findByToken(token: string): Promise<Invitation | null>;
  findByOrgAndEmail(orgId: string, email: string): Promise<Invitation | null>;
  save(invitation: Invitation): Promise<Invitation>;
  update(invitation: Invitation): Promise<Invitation>;
}
