import bcrypt, { compare } from "bcryptjs";

export class HashManager {
  generate = async (password: string) => {
    const rounds = Number(process.env.BCRYPT_ROUNDS);
    const salt = await bcrypt.genSalt(rounds);

    return bcrypt.hash(password, salt);
  };

  compare = (password: string, hashPassword: string) => {
    return bcrypt.compare(password, hashPassword);
  };
}
