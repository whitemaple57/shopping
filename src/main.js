//引入vue组件
import Vue from "vue";
//初始文件VUE
import App from "./App.vue";
//引入路由
import router from "@/router";
//引入VUEX
import store from "@/store";
//引入全局组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
import { Button, MessageBox } from "element-ui";
//引入图片懒加载插件
import Rick from "@/assets/1.jpg";
import VueLazyload from "vue-lazyload";
//引入校验插件
import "@/plugins/validate";
Vue.use(VueLazyload, {
  //懒加载默认图片
  loading: Rick,
});
//注册全局组件
Vue.component(Carousel.name, Carousel);
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination);
Vue.component(Button.name, Button);
//elementui注册组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入mock数据
import "@/mock/mockServe";
//引入轮播图
import "swiper/css/swiper.css";
Vue.config.productionTip = false;
//统一接口api文件夹里面全部请求函数
import * as API from "@/api";
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    //全局总线调用API
    Vue.prototype.$API = API;
  },
  //注册路由信息，组件身上有$route,$routershu
  router,
  //注册vuex，组件身上多$store属性
  store,
}).$mount("#app");
