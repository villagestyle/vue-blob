import { createApp } from "vue";
import App from "./App.vue";
import router, { setupRouter } from "./router";
import "element-plus/packages/theme-chalk/src/base.scss";
import 'highlight.js/styles/github.css'

import {
  setupElementComponents,
  setupElementPlugins
} from "./utils/elementImports";

const app = createApp(App);

setupRouter(app);
setupElementComponents(app);
setupElementPlugins(app);
// app.use(VueMarkdownEditor);

router.isReady().then(() => {
  app.mount("#app");
});
