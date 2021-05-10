declare type Indexable<T extends any = any> = {
  [key: string]: any;
};

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type TimeoutHandle = ReturnType<typeof setTimeout>;

declare type Nullable<T> = T | null;

declare type UserSex = 0 | 1 | 9;
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