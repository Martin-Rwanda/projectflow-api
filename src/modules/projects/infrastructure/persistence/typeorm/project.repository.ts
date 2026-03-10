import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProjectRepository } from '../../../domain/repositories/project.repository.interface';
import { Project } from '../../../domain/entities/project.entity';
import { ProjectOrmEntity } from './project.orm-entity';
import { ProjectMapper } from './project.mapper';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(
    @InjectRepository(ProjectOrmEntity)
    private readonly repo: Repository<ProjectOrmEntity>,
  ) {}

  async findById(id: string): Promise<Project | null> {
    const orm = await this.repo.findOne({ where: { id } });
    return orm ? ProjectMapper.toDomain(orm) : null;
  }

  async findBySlugAndOrg(slug: string, orgId: string): Promise<Project | null> {
    const orm = await this.repo.findOne({ where: { slug, orgId } });
    return orm ? ProjectMapper.toDomain(orm) : null;
  }

  async findAllByOrg(orgId: string): Promise<Project[]> {
    const orms = await this.repo.find({ where: { orgId }, order: { createdAt: 'DESC' } });
    return orms.map(ProjectMapper.toDomain);
  }

  async save(project: Project): Promise<Project> {
    const orm = ProjectMapper.toOrm(project);
    const saved = await this.repo.save(orm);
    return ProjectMapper.toDomain(saved);
  }

  async update(project: Project): Promise<Project> {
    const orm = ProjectMapper.toOrm(project);
    const updated = await this.repo.save(orm);
    return ProjectMapper.toDomain(updated);
  }

  async existsBySlugAndOrg(slug: string, orgId: string): Promise<boolean> {
    return this.repo.existsBy({ slug, orgId });
  }
}
