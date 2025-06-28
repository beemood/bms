import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PrismaClientModule } from '@beemood/prisma';

@Module({
  imports: [PrismaClientModule.forFeature({ resourceNames: ['permission'] })],
  controllers: [PermissionController],
})
export class PermissionModule {}
