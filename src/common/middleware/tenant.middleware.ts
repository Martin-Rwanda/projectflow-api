import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationOrmEntity } from '../../modules/organizations/infrastructure/persistence/typeorm/organization.orm-entity';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(OrganizationOrmEntity)
    private readonly orgRepo: Repository<OrganizationOrmEntity>,
  ) {}

  async use(req: Request & { orgId?: string }, res: Response, next: NextFunction) {
    const slug = (req.params['orgSlug'] || req.headers['x-org-slug']) as string;

    if (!slug) return next();

    const org = await this.orgRepo.findOne({ where: { slug } });
    if (!org) throw new NotFoundException(`Organization '${slug}' not found`);

    req.orgId = org.id;
    next();
  }
}
