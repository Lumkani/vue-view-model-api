import Vue from 'vue';
import App from './App.vue'
import { ViewModelPlugin } from '../dist/view-model-api.ssr'

Vue.config.productionTip = false;

Vue.use(ViewModelPlugin)

new Vue({
  render: (h) => h(App),
}).$mount('#app');
