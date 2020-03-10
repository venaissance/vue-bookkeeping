import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import Tab from '@/components/Tab.vue';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);
Vue.component('Tab', Tab);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

// 解决手机浏览初始不显示底部导航栏的问题
window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 200);
  }, 0);
};