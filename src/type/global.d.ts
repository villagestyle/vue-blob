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

export declare interface UserInfo {
  username: string;
  cellphone: string;
  email: string;
  id: string;
  name: string;
  sex: Nullable<UserSex>,
  token: string;
}

export declare interface UserLoginData {
  username: string;
  password: string;
}

export declare interface Article {
  title: string;
  content: string;
  creTime: number | string;
  creUserId: string;
  id: string;
  likesNum: number;
  readNum: string;
  commentNum: number;
  action: UpdateAction;
}

export declare interface Comment {
  id: string;
  user: UserInfo;
  creUserId: string;
  creTime: number | string;
  content: string;
  articleId: string;
}