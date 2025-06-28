/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nx/enforce-module-boundaries */
import {
  Body,
  Controller,
  Delete,
  Get,
  ParamId,
  Post,
  Put,
  Query,
} from '@beemood/nest';
import { InjectRepository } from '@beemood/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@bms/auth-prisma';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Hash } from '@beemood/crypto';
import { Property } from '@beemood/property';
import { QueryUserDto } from './dto/query-user.dto';

@Controller({ path: 'user' })
export class UserController {
  constructor(
    @InjectRepository('user')
    protected readonly repo: Prisma.UserDelegate
  ) {}

  async findByUsername(username: string) {
    return await this.repo.findUnique({ where: { username } });
  }

  async findByUsernameOrThrow(username: string) {
    const found = await this.findByUsername(username);
    if (!found) throw new NotFoundException(`${username} does not exist!`);
    return found;
  }

  async checkUsernameIsUnique(username: string) {
    const found = await this.findByUsername(username);
    if (found) {
      throw new UnprocessableEntityException({
        errors: [
          {
            proeprty: 'username',
            constraints: {
              isUnique: `Username must be unique!`,
            },
          },
        ],
      });
    }
  }

  @Get({})
  findAll(@Query(QueryUserDto) query: QueryUserDto) {
    return this.repo.findMany({
      take: query.take,
      skip: query.skip,
      where: { username: { contains: query.search } },
    });
  }

  @Get({ path: ':id' })
  findOneById(@ParamId() id: number) {
    return this.repo.findUnique({ where: { id } });
  }

  @Post({})
  async save(@Body() data: CreateUserDto) {
    const { username, password } = data;
    await this.checkUsernameIsUnique(username);
    const hashedPassword = await Hash.hash(password);
    return await this.repo.create({
      data: {
        username,
        password: hashedPassword.hash,
        passwordSalt: hashedPassword.salt,
      },
    });
  }

  @Put({ path: ':id' })
  async update(@ParamId() id: number, @Body() data: UpdateUserDto) {
    return await this.repo.update({ where: { id }, data });
  }

  @Delete({ path: ':id' })
  delete(@ParamId() id: number) {
    return this.repo.delete({ where: { id } });
  }
}
