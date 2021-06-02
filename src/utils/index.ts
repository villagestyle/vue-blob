import moment from "moment";
import { ElMessage } from "element-plus";
import { IMessageOptions, MessageParams } from "element-plus/lib/el-message/src/types";
import { Indexable } from "../type/global";

export const uuid = () => {
  const s: any[] = [];
  const hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  const uuid = moment(new Date()).format("YYYYMMDDHHmmss") + s.join("");
  return uuid;
};

type BlendType<S, R> = S | R;

export const TransformDateToFormatStr = <
  T extends Indexable,
  K extends keyof T
>(
  data: BlendType<T, T[]>,
  key: K,
  format = "YYYY-MM-DD"
) => {
  const result = (data instanceof Array ? data : [data]).map(item => {
    return Object.assign(item, { [key]: moment(item[key]).format(format) });
  });
  return result;
};

export const SingleElMessage = (params: MessageParams, options?: IMessageOptions) => {
  const defaultParams: IMessageOptions = {
    type: "error"
  };
  let messageParams = { ...defaultParams, ...options };
  if (typeof params === 'string') {
    messageParams = {
      ...messageParams,
      message: params
    }
  } else {
    messageParams = {
      ...messageParams,
      ...params
    };
  }
  ElMessage.closeAll();
  ElMessage(messageParams);
};
