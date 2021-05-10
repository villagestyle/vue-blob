import { UserPasswordReg, CellphoneReg } from "../../../utils/config";

export const validatePWD = (rule: any, value: any, callback: Function) => {
  if (value === "") {
    callback();
  } else {
    if (!UserPasswordReg.test(value)) {
      callback(new Error("密码需包含数字和大小写字母, 8-16位字符"));
    } else {
      callback();
    }
  }
};

export const validateCellphone = (
  rule: any,
  value: any,
  callback: Function
) => {
  if (value === "") {
    callback();
  } else {
    if (!CellphoneReg.test(value)) {
      callback(new Error("手机号码格式错误"));
    } else {
      callback();
    }
  }
};

export const UserRegiesterRules = {
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  username: [
    { required: true, message: "请输入账号(用作登录)", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  cellphone: [
    { required: true, message: "请输入手机号码", trigger: "blur" },
    { validator: validateCellphone, trigger: "blur" }
  ],
  sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
  captcha: [
    { required: true, message: "请输入动态验证码", trigger: "blur" },
    { min: 5, max: 5, message: "请输入正确的动态验证码", trigger: "blur" }
  ],
  password: [{ validator: validatePWD, trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { min: 5, max: 100, message: "请输入正确的邮箱", trigger: "blur" }
  ]
};

export const UserLoginRules = {
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
};
