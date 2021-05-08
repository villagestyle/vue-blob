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
  ElImage
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
  ElImage
];

const Plugins = [ElMessage, ElMessageBox];

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
