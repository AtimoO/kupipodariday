import * as bcrypt from 'bcrypt';

export const compare = async (password, user) => {
  return await bcrypt.compare(password, user.password).then((matched) => {
    if (!matched) return null;
    return user;
  });
};

export const hash = async (item: string, rounds: number) => {
  const salt = await bcrypt.genSalt(rounds);
  return await bcrypt.hash(item, salt);
};
