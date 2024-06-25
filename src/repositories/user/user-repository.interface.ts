import { UserUpdateDTO } from 'src/dtos/user';
import { UserEntity } from 'src/entities/user';

export interface IFindOptions {
  validate: boolean;
}

export interface IUpdateRefreshToken {
  userId: string;
  refreshToken: string | null;
}

export interface IFindManyOptions {
  take: number;
  page: number;
}

export interface IUserRepository {
  create(user: UserEntity): Promise<UserEntity>;
  findById(id: string, options?: IFindOptions): Promise<UserEntity | null>;
  findByEmail(
    email: string,
    options?: IFindOptions,
  ): Promise<UserEntity | null>;
  findMany(
    options: IFindManyOptions,
  ): Promise<{ users: UserEntity[]; count: number } | []>;
  update(user: UserUpdateDTO): Promise<UserEntity>;
  updateRefreshToken(data: IUpdateRefreshToken): Promise<void>;
}
