import { prisma } from "./BaseDatabase";

export class UserData {
  constructor() {}

  signup = async (id: string, name: string, email: string, password: string) => {
    try {
      await prisma.user.create({
        data: {
          id,
          name,
          email,
          password,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  getUserByEmail = async (email: string) => {
    try {
      return await prisma.user.findUnique({
        where: { email }
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
