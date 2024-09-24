import { cryptography } from 'src/infrastructure/security/cryptography';

export class UserEntity {
  id?: string;
  name: string;
  email: string;
  image?: string | null;
  password: string;
  refreshToken?: string | null;

  constructor(data: UserEntity) {
    Object.assign(this, data);
  }

  async hashPassword?() {
    if (!this.password) return;
    this.password = await cryptography.hashPassword(this.password);
  }

  async validatePassword?(confirmPassword: string) {
    const passwordMinLength = 8;

    const errors = [];

    if (!this.password || !confirmPassword) {
      return 'Envie a senha e a confirmação da senha.';
    }

    if (this.password !== confirmPassword) {
      errors.push('As senhas precisam ser iguais.');
    }

    if (
      this.password.length < passwordMinLength ||
      confirmPassword.length < passwordMinLength
    ) {
      errors.push(
        `A senha precisa ter pelo menos ${passwordMinLength} dígitos.`,
      );
    }
    return errors.shift();
  }
}
