import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { Dto } from '@beemood/property';

@Dto()
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
