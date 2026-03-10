import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { IInvitationRepository } from '../../../domain/repositories/invitation.repository.interface';
import { Invitation } from '../../../domain/entities/invitation.entity';
import { InvitationOrmEntity } from './invitation.orm-entity';
import { InvitationMapper } from './invitation.mapper';

@Injectable()
export class InvitationRepository implements IInvitationRepository {
  constructor(
    @InjectRepository(InvitationOrmEntity)
    private readonly repo: Repository<InvitationOrmEntity>,
  ) {}

  async findByToken(token: string): Promise<Invitation | null> {
    const orm = await this.repo.findOne({ where: { token } });
    return orm ? InvitationMapper.toDomain(orm) : null;
  }

  async findByOrgAndEmail(orgId: string, email: string): Promise<Invitation | null> {
    const orm = await this.repo.findOne({ where: { orgId, email } });
    return orm ? InvitationMapper.toDomain(orm) : null;
  }

  async save(invitation: Invitation): Promise<Invitation> {
    const orm = InvitationMapper.toOrm(invitation);
    const saved = await this.repo.save(orm);
    return InvitationMapper.toDomain(saved);
  }

  async update(invitation: Invitation): Promise<Invitation> {
    const orm = InvitationMapper.toOrm(invitation);
    const updated = await this.repo.save(orm);
    return InvitationMapper.toDomain(updated);
  }
}
