import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { PrismaClientModule } from '@beemood/prisma';

@Module({
  imports: [PrismaClientModule.forFeature({ resourceNames: ['role'] })],
  controllers: [RoleController],
})
export class RoleModule {}
