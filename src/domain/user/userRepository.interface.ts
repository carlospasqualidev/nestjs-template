//#region DTOS
import {
  UserCreateReturnDTO,
  UserDeleteByIdDTO,
  UserFindByIdDTO,
  UserFindPasswordByIdOrEmailDTO,
  UserFindPasswordByIdOrEmailReturnDTO,
  UserFindRefreshTokenByIdReturnDTO,
  UserFindByIdReturnDTO,
  UserUpdateDTO,
  UserCreateDTO,
} from 'src/application/dtos/user';
//#endregion

//#region INTERFACES
import {
  IFindManyReturn,
  IFindOptions,
  ITakeAndPage,
} from '../generic/genericRepository.interface';
//#endregion

//#region DOMAIN
import { UserEntity } from './user.entity';
//#endregion

export interface IUpdateRefreshToken {
  userId: string;
  refreshToken: string | null;
}

export interface IUpdatePassword {
  id: string;
  password: string;
  confirmPassword: string;
}

export interface IUserRepository {
  //#region CREATES
  create(user: UserCreateDTO): Promise<UserCreateReturnDTO>;
  //#endregion

  //#region FINDS
  findById(
    dto: UserFindByIdDTO,
    options?: IFindOptions,
  ): Promise<UserFindByIdReturnDTO | null>;

  findRefreshTokenById(
    dto: UserFindByIdDTO,
    options?: IFindOptions,
  ): Promise<UserFindRefreshTokenByIdReturnDTO | null>;

  findPasswordByIdOrEmail(
    dto: UserFindPasswordByIdOrEmailDTO,
    options?: IFindOptions,
  ): Promise<UserFindPasswordByIdOrEmailReturnDTO | null>;

  findByEmail(
    email: string,
    options?: IFindOptions,
  ): Promise<UserFindByIdReturnDTO | null>;

  findMany(options: ITakeAndPage): Promise<IFindManyReturn<UserEntity>>;
  //#endregion

  //#region UPDATES
  update(user: UserUpdateDTO): Promise<UserEntity>;
  updateRefreshToken(data: IUpdateRefreshToken): Promise<void>;
  updatePassword(dto: IUpdatePassword): Promise<void>;
  //#endregion

  // #region DELETES
  deleteById(dto: UserDeleteByIdDTO): Promise<void>;
  // #endregion
}
