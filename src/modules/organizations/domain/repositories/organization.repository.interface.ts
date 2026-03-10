import { Organization } from '../entities/organization.entity';

export const ORGANIZATION_REPOSITORY = Symbol('IOrganizationRepository');

export interface IOrganizationRepository {
  findById(id: string): Promise<Organization | null>;
  findBySlug(slug: string): Promise<Organization | null>;
  save(org: Organization): Promise<Organization>;
  update(org: Organization): Promise<Organization>;
  existsBySlug(slug: string): Promise<boolean>;
}
