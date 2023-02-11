import * as bcrypt from 'bcrypt';
import { User } from './../users/entities/user.entity';

export const compare = async (password: string, user: User) => {
  return await bcrypt.compare(password, user.password).then((matched) => {
    if (!matched) return null;
    return user;
  });
};

export const hash = async (item: string, rounds: number) => {
  // const salt = await bcrypt.genSalt(rounds);
  return await bcrypt.hash(item, rounds);
};
