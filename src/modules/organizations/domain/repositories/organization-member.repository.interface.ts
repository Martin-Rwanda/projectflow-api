import { OrganizationMember } from '../entities/organization-member.entity';

export const ORGANIZATION_MEMBER_REPOSITORY = Symbol('IOrganizationMemberRepository');

export interface IOrganizationMemberRepository {
  findByOrgAndUser(orgId: string, userId: string): Promise<OrganizationMember | null>;
  findAllByOrg(orgId: string): Promise<OrganizationMember[]>;
  findAllByUser(userId: string): Promise<OrganizationMember[]>;
  save(member: OrganizationMember): Promise<OrganizationMember>;
  update(member: OrganizationMember): Promise<OrganizationMember>;
  delete(id: string): Promise<void>;
}
