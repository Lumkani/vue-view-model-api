import { ViewModelPlugin } from './plugin'

// install function executed by Vue.use()

// To auto-install when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
// let GlobalVue = null;
// if (typeof window !== 'undefined') {
//   GlobalVue = window.Vue;
// } else if (typeof global !== 'undefined') {
//   GlobalVue = global.Vue;
// }
// if (GlobalVue) {
//   // GlobalVue.use(ViewModelPlugin);
// }

if (window !== 'undefined') {
  window.ViewModelPlugin = ViewModelPlugin
}

export { ViewModelPlugin }
