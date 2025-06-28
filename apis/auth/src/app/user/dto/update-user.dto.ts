import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Dto } from '@beemood/property';

@Dto()
export class UpdateUserDto extends PartialType(CreateUserDto) {}
