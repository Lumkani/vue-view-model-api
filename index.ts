import * as validators from 'vuelidate/lib/validators'
import {
  mapState,
  mapActions,
  mapMutations,
  mapGetters,
} from 'vuex'

interface ViewModelConfig {
  loader?: object;
  snackbar?: object;
  lk?: object;
  validators?: object;
}

// @ts-ignore
const convertClassViewModelToOptionsAPI = (vm, options: ViewModelConfig) => {
  const { ViewModel = {} } = vm.$options
  const {
    methods = {},
    computed = {},
    vuex = {},
    validations = () => ({}),
    data = () => ({}),
    mounted = () => {},
  } = ViewModel

  if (Object.keys(ViewModel).length) {
    const [newMethods, newComputedProps] = [methods, computed]
      .map(option => Object.keys(option).reduce((result: object, val: string) => ({
        ...result,
        [val]: (e: Event) => option[val](vm, e),
      }), {}))

    const {
      state = {},
      getters = {},
      mutations = {},
      actions = {},
    } = vuex

    vm.$options.methods = {
      ...vm.$options.methods,
      ...newMethods,
      ...mapMutations(mutations),
      ...mapActions(actions),
    }


    vm.$options.computed = {
      ...vm.$options.computed,
      ...newComputedProps,
      ...mapState(state),
      ...mapGetters(getters),
    }

    const newValidators = {
      ...validators,
      ...options.validators
    }

    const isDynamicValidationFn = typeof validations(newValidators) === 'function'

    vm.$options.validations = isDynamicValidationFn ? () => validations(newValidators)(vm) : validations(newValidators)

    if (Array.isArray(vm.$options.mounted)) {
      vm.$options.mounted = [
        ...vm.$options.mounted,
        async () => mounted(vm),
      ]
    } else {
      vm.$options.mounted = [async () => mounted(vm)]
    }

    const res = vm.$options.data.apply(vm)
    vm.$options.data = () => ({ ...res, ...data(vm) })
  }
}

export const ViewModelPlugin = {
  install(vue: Vue.VueConstructor, options: ViewModelConfig = {}) {
    vue.prototype.$loader = options.loader
    vue.prototype.$snackbar = options.snackbar
    vue.prototype.$lk = options.lk

    vue.mixin({
      beforeCreate() {
        convertClassViewModelToOptionsAPI(this, options)
      },
    })
  },
}
