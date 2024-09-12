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
}
