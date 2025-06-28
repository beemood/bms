import { PartialType } from '@nestjs/swagger';
import { CreatePermissionDto } from './create-permission.dto';
import { Dto } from '@beemood/property';

@Dto()
export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
