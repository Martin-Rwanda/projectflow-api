import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn } from 'class-validator';
import { OrgRole } from '../../domain/entities/organization-member.entity';

export class InviteMemberDto {
  @ApiProperty({ example: 'jane@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ enum: ['admin', 'member', 'guest'], example: 'member' })
  @IsIn(['admin', 'member', 'guest'])
  role: Exclude<OrgRole, 'owner'>;
}
