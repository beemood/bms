import { Body, Controller, Get, ParamId, Post, Put } from '@beemood/nest';
import { InjectRepository } from '@beemood/prisma';
import { Prisma } from '../../generated/prisma';

@Controller({ path: 'category' })
export class CategoryController {
  constructor(
    @InjectRepository('category')
    protected readonly repo: Prisma.CategoryDelegate
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
  save(@Body() data: any) {
    return this.repo.create({ data });
  }

  @Put({ path: ':id' })
  update(@ParamId() id: number, @Body() data: any) {
    return this.repo.update({ where: { id }, data });
  }
}
