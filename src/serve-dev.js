import Vue from 'vue';
import Vuex, { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import App from './App.vue'
import { ViewModelPlugin } from '../dist/view-model-api.ssr'

Vue.config.productionTip = false;

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    hello: 'world'
  },
  mutations: {
    helloUpdate(state) {
      state.hello = 'Hello'
    }
  }
})

Vue.use(ViewModelPlugin, {
  modifiers: [
    (ctx) => {
      const { vuex = {} } = ctx.ViewModel

      const {
        state = {},
        getters = {},
        mutations = {},
        actions = {}
      } = vuex

      ctx.addToMethods({
        ...mapMutations(mutations),
        ...mapActions(actions)
      })

      ctx.addToComputed({
        ...mapState(state),
        ...mapGetters(getters)
      })
    }
  ]
})

new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app');
