import type { App } from "vue";
import {
  ElRow,
  ElCol,
  ElMessage,
  ElButton,
  ElMessageBox,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElRadioGroup,
  ElImage,
  ElLoading,
  ElInfiniteScroll,
  ElSpace
} from "element-plus";

const Components = [
  ElRow,
  ElCol,
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElRadioGroup,
  ElImage,
  ElSpace
];

const Plugins = [ElMessage, ElMessageBox, ElLoading, ElInfiniteScroll];

export const setupElementComponents = (app: App<Element>) => {
  Components.forEach(component => {
    app.component(component.name, component);
  });
};

export const setupElementPlugins = (app: App<Element>) => {
  Plugins.forEach(plugins => {
    app.use(plugins);
  });
};
