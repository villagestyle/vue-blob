import { UserLoginData, UserRegiestData } from "../type/global";
import axios, { postForm } from "./config";

export default {
  /** 登录 */
  login: (data: UserLoginData) => postForm(`user/login`, data),
  /** 注册学生用户 */
  register: (data: UserRegiestData) => postForm("user/register", data),
  /** 动态验证码 */
  captcha: (token: string) =>
    axios.get(`captcha`, {
      params: { token },
      responseType: "blob"
    }),
  /** 登出 */
  logout: () => axios.post(`user/logout`)
};
