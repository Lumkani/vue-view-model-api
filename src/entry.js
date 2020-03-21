import { ViewModelPlugin } from './plugin'

// install function executed by Vue.use()
// const install = function installViewModelApi(Vue) {
//   if (install.installed) return;
//   install.installed = true;

//   Vue.use(ViewModelPlugin)
// };

// Create module definition for Vue.use()
// const plugin = {
//   install,
// };

// // To auto-install when vue is found
// // eslint-disable-next-line no-redeclare
// /* global window, global */
// let GlobalVue = null;
// if (typeof window !== 'undefined') {
//   GlobalVue = window.Vue;
// } else if (typeof global !== 'undefined') {
//   GlobalVue = global.Vue;
// }
// if (GlobalVue) {
//   GlobalVue.use(plugin);
// }

export { ViewModelPlugin }
