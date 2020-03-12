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

// PC用户提示使用手机扫码预览
if (document.documentElement.clientWidth > 500) {
  window.alert('最佳效果需要使用手机扫码查看哦~');
  const img = document.createElement('img');
  img.src = '/qrcode.png';
  img.style.position = 'fixed';
  img.style.left = '50%';
  img.style.top = '50%';
  img.style.transform = 'translate(-50%, -50%)';
  img.style.boxShadow = '0 0 10px rgba(0,0,0,0.25)';
  document.body.appendChild(img);
}