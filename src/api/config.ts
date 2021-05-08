import axios, { Method } from "axios";
import { UserStore } from "../store/modules/user";
import { SysConfig } from "../utils/config";
import { ElMessage } from "element-plus";

const instance = axios.create({
  // baseURL: "http://www.villagestyle.top:9002/interface"
  baseURL: "http://localhost:9002/interface"
});

instance.interceptors.request.use(
  config => {
    config.headers.common = {};
    config.headers.common["Authorization"] = UserStore.getToken;
    return config;
  },
  err => {
    return Promise.reject(err.response);
  }
);

instance.interceptors.response.use(
  data => data,
  err => {
    if (err.response && err.response.status === 401) {
      //   store.dispatch(userActoons.toggle());
      //   message.error("登录超时, 请重新登录");
      //   store.dispatch(push(`/${Config.PACKAGE_NAME}`));
    } else if (err.response && err.response?.data) {
      if (err.response?.data instanceof ArrayBuffer) {
        ab2str(err.response?.data, (result: string) => {
          ElMessage.error(JSON.parse(result)?.message);
        });
      } else {
        ElMessage.error(err.response.data.message || err.response.data.errmsg);
      }
    } else {
      ElMessage.error("未知错误!");
      //   store.dispatch(push(`/${Config.PACKAGE_NAME}/error`));
    }
    return Promise.reject(err.response);
  }
);

export const postForm = (url: string, data: any, method: Method = "post") => {
  return instance({
    method: method,
    url,
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    transformRequest: [
      datas => {
        let ret = "";
        for (const it of Object.keys(datas)) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(datas[it]) + "&";
        }
        ret = ret.substring(0, ret.lastIndexOf("&"));
        return ret;
      }
    ]
  });
};

function ab2str(u: string, cb: Function) {
  var b = new Blob([u]);
  var r = new FileReader();
  r.readAsText(b, "utf-8");
  r.onload = function () {
    if (cb) cb.call(null, r.result);
  };
}

export default instance;