import { Dto, Property } from '@beemood/property';

@Dto()
export class CreateRoleDto {
  @Property({ type: 'string', required: true, minLength: 3, maxLength: 30 })
  name: string;
}
