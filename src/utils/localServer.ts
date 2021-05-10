import { SysConfig } from "./config";

export const get = (key: string, token = "") => {
  const data = localStorage.getItem(SysConfig.localServerKey + token);
  if (data) {
    let storeValue;
    try {
      storeValue = JSON.parse(data);
    } catch(err) {
      storeValue = {};
    }
    if (key === (SysConfig.localServerKey + token)) return storeValue;
    return (storeValue[key] === null || storeValue[key] === undefined) ? '' : storeValue[key];
  }
  return "";
};

export const set = (key: string, data: any, token = "") => {
  let storeValue = get(SysConfig.localServerKey + token, token);
  if (!storeValue) {
    storeValue = {};
  }
  storeValue[key] = data;
  localStorage.setItem(SysConfig.localServerKey + token, JSON.stringify(storeValue));
  return storeValue[key];
};

export const removeItem = (key: string, token = "") => {
  const data = localStorage.getItem(SysConfig.localServerKey + token);
  if (data) {
    let storeValue;
    try {
      storeValue = JSON.parse(data);
    } catch(err) {
      storeValue = {};
    }
    const deleteData = storeValue[key];
    delete storeValue[key];
    localStorage.setItem(SysConfig.localServerKey + token, JSON.stringify(storeValue));
    return { key: deleteData };
  }
}

export default {
  set,
  get,
  removeItem
};
