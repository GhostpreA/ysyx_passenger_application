import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, {Field, Form} from 'vant';
import 'vant/lib/index.css';
import './myaxios.js'
import { Dialog } from 'vant';

// 全局注册
Vue.use(Dialog);
Vue.use(Form);
Vue.use(Field);
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
