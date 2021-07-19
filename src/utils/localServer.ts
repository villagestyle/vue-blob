import { SysConfig } from './config';

const get = (key: string, token = '') => {
  const data = getOriginData(token);
  if (data) {
    const storeValue = stringParseToObject(data);
    if (key === SysConfig.localServerKey + token) return storeValue;
    return storeValue[key] === null || storeValue[key] === undefined ? '' : storeValue[key];
  }
  return '';
};

const set = (key: string, data: any, token = '') => {
  const baseKey = SysConfig.localServerKey + token;
  let storeValue = get(baseKey, token);
  if (!storeValue) {
    storeValue = {};
  }
  storeValue[key] = data;
  localStorage.setItem(baseKey, JSON.stringify(storeValue));
  return storeValue[key];
};

const removeItem = (key: string, token = '') => {
  const data = getOriginData(token);
  if (data) {
    const storeValue = stringParseToObject(data);
    const deleteData = storeValue[key];
    delete storeValue[key];
    localStorage.setItem(SysConfig.localServerKey + token, JSON.stringify(storeValue));
    return { key: deleteData };
  }
};

const clear = (token = '') => {
  const data = getOriginData(token);
  localStorage.clear();
  return stringParseToObject(data);
};

/** 将localStorage.get获取的值转化为键值对形式返回 */
export const stringParseToObject = (value: string) => {
  let storeValue;
  try {
    storeValue = JSON.parse(value);
  } catch (err) {
    storeValue = {};
  }
  return storeValue;
};

/** 获取元数据 */
export const getOriginData = (token = '') => {
  return localStorage.getItem(SysConfig.localServerKey + token) || '';
};

export default {
  set,
  get,
  removeItem,
  clear,
};
