import { UserEntity } from '../user.entity';
import { UserDto } from '../dto/user-dto';

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, username, email } = data;

  return { id, username, email };
};
