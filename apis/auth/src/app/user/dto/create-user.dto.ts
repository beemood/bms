import { Dto, Property } from '@beemood/property';
@Dto()
export class CreateUserDto {
  @Property({ type: 'string', required: true, stringFormat: 'email' })
  username: string;

  @Property({ type: 'string', required: true, stringFormat: 'password' })
  password: string;
}
