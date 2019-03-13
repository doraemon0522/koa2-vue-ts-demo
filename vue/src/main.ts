/** 如果router import()解析有报错 可安装plugin-syntax-dynamic-import以及下两行 */
// import 'core-js/modules/es6.promise';
// import 'core-js/modules/es6.array.iterator';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
