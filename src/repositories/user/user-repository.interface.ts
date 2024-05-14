import { UserEntity } from 'src/entities';

export interface IUserRepositoryFindOptions {
  validate: boolean;
}

export interface IUpdateRefreshToken {
  userId: string;
  refreshToken: string | null;
}

export interface IUserRepository {
  create(user: UserEntity): Promise<UserEntity>;

  findById(
    id: string,
    options?: IUserRepositoryFindOptions,
  ): Promise<UserEntity | null>;
  findByEmail(
    email: string,
    options?: IUserRepositoryFindOptions,
  ): Promise<UserEntity | null>;

  update(user: UserEntity): Promise<UserEntity>;
  updateRefreshToken(data: IUpdateRefreshToken): Promise<void>;
}
