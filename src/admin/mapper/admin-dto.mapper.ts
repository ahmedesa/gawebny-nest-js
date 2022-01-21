import { AdminEntity } from '../admin.entity';
import { AdminDto } from '../dto/admin-dto';

export const toUserDto = (data: AdminEntity): AdminDto => {
  const { id, username, email } = data;
  let userDto: AdminDto = { id, username, email };
  return userDto;
};
