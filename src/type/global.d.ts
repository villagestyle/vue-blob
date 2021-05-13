declare type Indexable<T extends any = any> = {
  [key: string]: any;
};

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type TimeoutHandle = ReturnType<typeof setTimeout>;

declare type Nullable<T> = T | null;

declare type UserSex = 0 | 1 | 9;

declare type UpdateAction = 0 | 1;
export declare interface UserRegiestData {
  username: string;
  name: string;
  sex: Nullable<UserSex>,
  password: string;
  email: string;
  cellphone: string;
  captcha: string; // 动态验证码
  token: string;
}

export declare interface UserLoginData {
  username: string;
  password: string;
}

export declare interface Article {
  title: string;
  content: string;
  creTime: number;
  creUserId: string;
  id: string;
  likesNum: number;
  readNum: string;
  action: UpdateAction;
}