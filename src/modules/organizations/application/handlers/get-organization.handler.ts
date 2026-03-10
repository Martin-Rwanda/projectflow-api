import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { GetOrganizationQuery } from '../queries/get-organization.query';
import type { IOrganizationRepository } from '../../domain/repositories/organization.repository.interface';
import { ORGANIZATION_REPOSITORY } from '../../domain/repositories/organization.repository.interface';
import type { IOrganizationMemberRepository } from '../../domain/repositories/organization-member.repository.interface';
import { ORGANIZATION_MEMBER_REPOSITORY } from '../../domain/repositories/organization-member.repository.interface';

@QueryHandler(GetOrganizationQuery)
export class GetOrganizationHandler implements IQueryHandler<GetOrganizationQuery> {
  constructor(
    @Inject(ORGANIZATION_REPOSITORY)
    private readonly orgRepository: IOrganizationRepository,
    @Inject(ORGANIZATION_MEMBER_REPOSITORY)
    private readonly memberRepository: IOrganizationMemberRepository,
  ) {}

  async execute(query: GetOrganizationQuery) {
    const org = await this.orgRepository.findById(query.orgId);
    if (!org) throw new NotFoundException('Organization not found');

    const members = await this.memberRepository.findAllByOrg(query.orgId);

    return {
      id: org.id,
      name: org.name,
      slug: org.slug,
      logoUrl: org.logoUrl,
      planId: org.planId,
      membersCount: org.membersCount,
      projectsCount: org.projectsCount,
      members: members.map((m) => ({
        id: m.id,
        userId: m.userId,
        role: m.role,
        status: m.status,
        joinedAt: m.joinedAt,
      })),
    };
  }
}
