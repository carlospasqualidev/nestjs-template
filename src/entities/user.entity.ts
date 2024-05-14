export class UserEntity {
  id?: string;
  name: string;
  email: string;
  image?: string | null;
  password: string;
  refreshToken?: string | null;
  isBlocked?: boolean = false;
  isDeleted?: boolean = false;

  constructor(data: UserEntity) {
    Object.assign(this, data);
  }
}
