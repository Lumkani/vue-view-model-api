import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import Vuelidate from 'vuelidate'
import App from './App.vue'
import { ViewModelPlugin } from '../dist/view-model-api.ssr'

Vue.config.productionTip = false;

const addVuelidateModifier = (ctx) => {
  const { validations } = ctx.ViewModel

  if (validations) {
    ctx.vm.$options.validations = validations()
  }
}

const addConstantsAttrModifier = (ctx) => {
  const { constants = () => {} } = ctx.ViewModel

  const constantsObject = constants()
  const constantsKeys = Object.keys(constantsObject)

  for (const key of constantsKeys) {
    Object.defineProperty(ctx.vm, key, {
      value: Object.freeze(constantsObject[key]),
      writable: false,
      configurable: false,
      enumerable: false,
    })
  }
}

Vue.use(ViewModelPlugin, {
  modifiers: [
    addVuelidateModifier,
    addConstantsAttrModifier,
  ],
})

Vue.use(Vuelidate)

new Vue({
  render: (h) => h(App),
}).$mount('#app');
