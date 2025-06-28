import {
  Body,
  Controller,
  Delete,
  Get,
  ParamId,
  Post,
  Put,
} from '@beemood/nest';
import { InjectRepository } from '@beemood/prisma';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Prisma } from '@bms/prisma-inventory';

@Controller({ path: 'role' })
export class RoleController {
  constructor(
    @InjectRepository('role')
    protected readonly repo: Prisma.RoleDelegate
  ) {}

  @Get({})
  findAll() {
    return this.repo.findMany();
  }

  @Get({ path: ':id' })
  findOneById(@ParamId() id: number) {
    return this.repo.findUnique({ where: { id } });
  }

  @Post({})
  save(@Body() data: CreateRoleDto) {
    return this.repo.create({ data });
  }

  @Put({ path: ':id' })
  update(@ParamId() id: number, @Body() data: UpdateRoleDto) {
    return this.repo.update({ where: { id }, data });
  }

  @Delete({ path: ':id' })
  delete(@ParamId() id: number) {
    return this.repo.delete({ where: { id } });
  }
}
