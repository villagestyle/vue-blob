import type { App } from "vue";
import { ElRow, ElCol, ElMessage, ElButton } from "element-plus";

const Components = [ElRow, ElCol, ElButton];

const Plugins = [ElMessage];

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
