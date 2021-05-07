import { createApp } from "vue";
import App from "./App.vue";
import router, { setupRouter } from "./router";
// import './type/global';
import { AppStore } from "./store/modules/app";
import "element-plus/packages/theme-chalk/src/base.scss";
import {
  setupElementComponents,
  setupElementPlugins
} from "./utils/elementImports";

const app = createApp(App);

setupRouter(app);
setupElementComponents(app);
setupElementPlugins(app);

AppStore.commitSysNo("VITE_APP");

router.isReady().then(() => {
  app.mount("#app");
});
