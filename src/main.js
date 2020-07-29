import Vue from 'vue'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/pt-br'
import InputMask from "inputmask"

import App from './App.vue'
import store from './store'
import router from './route'

import 'element-ui/lib/theme-chalk/index.css';
//import "bootstrap/dist/css/bootstrap-grid.css";
import "primeflex/primeflex.css"


Vue.config.productionTip = false
Vue.use(ElementUI, {locale})

Vue.directive('mask', {
  bind: function (el, binding) {
    InputMask(binding.value).mask(el.getElementsByTagName('INPUT')[0])
  }
})

window.xApp = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
