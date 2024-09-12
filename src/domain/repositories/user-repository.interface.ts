import { UserUpdateDTO } from 'src/application/dtos/user';
import { UserEntity } from 'src/domain/entities';
import { IFindOptions, ITakeAndPage } from './generics-repository.interface';

export interface IUpdateRefreshToken {
  userId: string;
  refreshToken: string | null;
}

export interface IUserRepository {
  create(user: UserEntity): Promise<UserEntity>;
  findById(id: string, options?: IFindOptions): Promise<UserEntity | null>;
  findByEmail(
    email: string,
    options?: IFindOptions,
  ): Promise<UserEntity | null>;
  findMany(
    options: ITakeAndPage,
  ): Promise<{ users: UserEntity[]; count: number } | []>;
  update(user: UserUpdateDTO): Promise<UserEntity>;
  updateRefreshToken(data: IUpdateRefreshToken): Promise<void>;
  delete(id: string): Promise<void>;
}
