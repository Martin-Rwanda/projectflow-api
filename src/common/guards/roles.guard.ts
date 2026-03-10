import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { OrgRole } from '../../modules/organizations/domain/entities/organization-member.entity';
import type { IOrganizationMemberRepository } from '../../modules/organizations/domain/repositories/organization-member.repository.interface';
import { ORGANIZATION_MEMBER_REPOSITORY } from '../../modules/organizations/domain/repositories/organization-member.repository.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(ORGANIZATION_MEMBER_REPOSITORY)
    private readonly memberRepository: IOrganizationMemberRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<OrgRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const orgId = request.orgId;

    if (!user || !orgId) throw new ForbiddenException('Missing user or org context');

    const member = await this.memberRepository.findByOrgAndUser(orgId, user.id);
    if (!member || !member.isActive)
      throw new ForbiddenException('Not a member of this organization');

    const roleHierarchy: OrgRole[] = ['guest', 'member', 'admin', 'owner'];
    const userRoleIndex = roleHierarchy.indexOf(member.role);
    const hasRole = requiredRoles.some((role) => userRoleIndex >= roleHierarchy.indexOf(role));

    if (!hasRole) throw new ForbiddenException('Insufficient permissions');

    request.orgMember = member;
    return true;
  }
}
