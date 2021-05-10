import { createApp } from "vue";
import App from "./App.vue";
import router, { setupRouter } from "./router";
import "element-plus/packages/theme-chalk/src/base.scss";

// import VueMarkdownEditor from '@kangc/v-md-editor'
// import '@kangc/v-md-editor/lib/style/base-editor.css';
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// VueMarkdownEditor.use(vuepressTheme);

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
