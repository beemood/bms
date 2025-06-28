import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaClientModule } from '@beemood/prisma';

@Module({
  imports: [PrismaClientModule.forFeature({ resourceNames: ['user'] })],
  controllers: [UserController],
})
export class UserModule {}
