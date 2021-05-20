import moment from "moment";
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

// const TransformDateToFormatStr = (data: Indexable | Indexable[], key: string, format = 'YYYY-MM-DD') => {
//   if (data instanceof Array) {

//   } else {
//     data[key] = moment(data[key]).format(format);
//   }
// }

type BlendType<S, R> = S | R;

export const TransformDateToFormatStr = <T extends Indexable, K extends keyof T>(
  data: BlendType<T, T[]>,
  key: K,
  format = "YYYY-MM-DD"
) => {
  const result = (data instanceof Array ? data : [data]).map(item => {
    return Object.assign(item, { [key]: moment(item[key]).format(format) })
  });
  return result;
};
