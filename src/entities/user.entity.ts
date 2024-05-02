export class UserEntity {
  id?: string;
  name: string;
  email: string;
  image?: string | null;
  password: string;
  isBlocked: boolean;
  isDeleted: boolean;

  constructor(data: UserEntity) {
    Object.assign(this, data);
  }
}
