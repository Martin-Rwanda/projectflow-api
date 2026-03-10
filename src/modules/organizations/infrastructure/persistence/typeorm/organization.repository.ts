import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IOrganizationRepository } from '../../../domain/repositories/organization.repository.interface';
import { Organization } from '../../../domain/entities/organization.entity';
import { OrganizationOrmEntity } from './organization.orm-entity';
import { OrganizationMapper } from './organization.mapper';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(
    @InjectRepository(OrganizationOrmEntity)
    private readonly repo: Repository<OrganizationOrmEntity>,
  ) {}

  async findById(id: string): Promise<Organization | null> {
    const orm = await this.repo.findOne({ where: { id } });
    return orm ? OrganizationMapper.toDomain(orm) : null;
  }

  async findBySlug(slug: string): Promise<Organization | null> {
    const orm = await this.repo.findOne({ where: { slug } });
    return orm ? OrganizationMapper.toDomain(orm) : null;
  }

  async save(org: Organization): Promise<Organization> {
    const orm = OrganizationMapper.toOrm(org);
    const saved = await this.repo.save(orm);
    return OrganizationMapper.toDomain(saved);
  }

  async update(org: Organization): Promise<Organization> {
    const orm = OrganizationMapper.toOrm(org);
    const updated = await this.repo.save(orm);
    return OrganizationMapper.toDomain(updated);
  }

  async existsBySlug(slug: string): Promise<boolean> {
    return this.repo.existsBy({ slug });
  }
}
