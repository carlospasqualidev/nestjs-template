import { compare, hashSync } from 'bcrypt';

import crypto from 'crypto';
import { env } from '../env';

const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);

export class Cryptography {
  async hashPassword(password: string): Promise<string> {
    return hashSync(password, 12);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }

  async encrypt(hash: string) {
    const cipher = crypto.createCipheriv(
      algorithm,
      Buffer.from(env.get('CRYPTO_SECRET'), 'utf-8'),
      iv,
    );

    const encrypted = Buffer.concat([cipher.update(hash), cipher.final()]);

    return {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex'),
    };
  }

  async decrypt(hash: { iv: string; content: string }) {
    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(env.get('CRYPTO_SECRET'), 'utf-8'),
      Buffer.from(hash.iv, 'hex'),
    );

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(hash.content, 'hex')),
      decipher.final(),
    ]);

    return decrypted.toString();
  }
}

export const cryptography = new Cryptography();
