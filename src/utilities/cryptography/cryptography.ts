import { compare, hashSync } from 'bcrypt';

class CryptographyCore {
  async hashPassword(password: string): Promise<string> {
    return hashSync(password, 12);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}

export const Cryptography = new CryptographyCore();
