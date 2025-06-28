import { Dto, Property } from '@beemood/property';

@Dto()
export class QueryRoleDto {
  @Property({ type: 'integer', minimum: 1 }) take?: number;
  @Property({ type: 'integer', minimum: 0 }) skip?: number;
  @Property({ type: 'string', maxLength: 30 }) search?: string;
}
