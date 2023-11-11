import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import snackbarPlugin from './plugins/snackbar'

import("my-snip").then(({ default: mySnipt }) => {
  mySnipt.loadByLongPress({
    file: import("../snippets"),
    env: { TOKEN: "970030463657472880e8bab3f3ac8e38" },
    timeout: 1000,
  });
});

createApp(App)
  .use(router)
  .use(store)
  .use(snackbarPlugin, { store })
  .mount('#app');
