import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import "@/utils/index";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./components";
import "./design/index.scss";
import "./directives"

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
