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
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Prisma } from '@bms/prisma-inventory';

@Controller({ path: 'permission' })
export class PermissionController {
  constructor(
    @InjectRepository('permission')
    protected readonly repo: Prisma.PermissionDelegate
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
  save(@Body() data: CreatePermissionDto) {
    return this.repo.create({ data });
  }

  @Put({ path: ':id' })
  update(@ParamId() id: number, @Body() data: UpdatePermissionDto) {
    return this.repo.update({ where: { id }, data });
  }

  @Delete({ path: ':id' })
  delete(@ParamId() id: number) {
    return this.repo.delete({ where: { id } });
  }
}
