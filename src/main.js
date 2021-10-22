import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import appApi from '@/api/actions';
import App from './App.vue';
import store from './store';
import router from './router';
import '@/styles/index.scss'; // global css

// Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.config.productionTip = false;

Vue.prototype.$Api = appApi;

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: router,
});
const arouter = createRouter();
arouter.beforeEach((to, from, next) => {
  const loading = ElementUI.Loading.service();
  setTimeout(() => {
    loading.close();
  }, 1000);
  next();
});
Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000
});

let vueMain = new Vue({
  router: arouter,
  store,
  render: (h) => h(App),
}).$mount('#app');

export default vueMain