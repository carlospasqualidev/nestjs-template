import { compare, hashSync } from 'bcrypt';

export class Cryptography {
  async hashPassword(password: string): Promise<string> {
    return hashSync(password, 12);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}

export const cryptography = new Cryptography();
