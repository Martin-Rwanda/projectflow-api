import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IOrganizationMemberRepository } from '../../../domain/repositories/organization-member.repository.interface';
import { OrganizationMember } from '../../../domain/entities/organization-member.entity';
import { OrganizationMemberOrmEntity } from './organization-member.orm-entity';
import { OrganizationMemberMapper } from './organization-member.mapper';

@Injectable()
export class OrganizationMemberRepository implements IOrganizationMemberRepository {
  constructor(
    @InjectRepository(OrganizationMemberOrmEntity)
    private readonly repo: Repository<OrganizationMemberOrmEntity>,
  ) {}

  async findByOrgAndUser(orgId: string, userId: string): Promise<OrganizationMember | null> {
    const orm = await this.repo.findOne({ where: { orgId, userId } });
    return orm ? OrganizationMemberMapper.toDomain(orm) : null;
  }

  async findAllByOrg(orgId: string): Promise<OrganizationMember[]> {
    const orms = await this.repo.find({ where: { orgId } });
    return orms.map(OrganizationMemberMapper.toDomain);
  }

  async findAllByUser(userId: string): Promise<OrganizationMember[]> {
    const orms = await this.repo.find({ where: { userId } });
    return orms.map(OrganizationMemberMapper.toDomain);
  }

  async save(member: OrganizationMember): Promise<OrganizationMember> {
    const orm = OrganizationMemberMapper.toOrm(member);
    const saved = await this.repo.save(orm);
    return OrganizationMemberMapper.toDomain(saved);
  }

  async update(member: OrganizationMember): Promise<OrganizationMember> {
    const orm = OrganizationMemberMapper.toOrm(member);
    const updated = await this.repo.save(orm);
    return OrganizationMemberMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
