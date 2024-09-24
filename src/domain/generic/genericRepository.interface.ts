export interface IFindOptions {
  validate: boolean;
}

export interface ITakeAndPage {
  take: number;
  page: number;
}

export interface IFindManyReturn<T> {
  data: T[] | [];
  count: number;
}
