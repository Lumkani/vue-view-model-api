import {
  mapState,
  mapActions,
  mapMutations,
  mapGetters,
} from 'vuex'

interface ViewModelConfig {
  validators?: object;
  config?: (vm: object, ctx: object) => void
}

const addLifecycleHook = (vm: any, hookName: string, hook: Function) => {
  if (Array.isArray(vm.$options[hookName])) {
    vm.$options[hookName] = [
      ...vm.$options[hookName],
      async () => hook(vm),
    ]
  } else {
    vm.$options[hookName] = [async () => hook(vm)]
  }
}

// @ts-ignore
const convertClassViewModelToOptionsAPI = (vm, options: ViewModelConfig) => {
  const { config = () => {} } = options
  const { ViewModel = {} } = vm.$options
  const {
    methods = {},
    computed = {},
    vuex = {},
    validations = () => ({}),
    data = () => ({}),
    beforeCreate = () => {},
    created = () => {},
    beforeMount = () => {},
    mounted = () => {},
    beforeUpdate = () => {},
    updated = () => {},
    beforeDestroy = () => {},
    destroyed= () => {},
  } = ViewModel

  config(vm, {
    methods(cb: (arg: object) => object = () => ({})) {
      vm.$options.methods = {
        ...vm.$options.methods,
        ...cb(vm.$options.methods)
      }
    },
    data(cb: (arg: object) => object = () => ({})) {
      const res = vm.$options.data.apply(vm)
      vm.$options.data = () => ({ ...res, ...cb(vm) })
    },
    computed(cb: (arg: object) => object = () => ({})) {
      vm.$options.computed = {
        ...vm.$options.computed,
        ...cb(vm.$options.computed)
      }
    },
    addOption(obj: object) {
      const keys = Object.keys(obj)

      keys.forEach((key) => {
        // @ts-ignore
        vm.$options[key] = obj[key]
      })
    }
  })

  beforeCreate(vm)

  if (Object.keys(ViewModel).length) {
    const [newMethods, newComputedProps] = [methods, computed]
      .map(option => Object.keys(option).reduce((result: object, val: string) => ({
        ...result,
        [val]: (...args: any[]) => option[val](vm, ...args),
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
      ...options.validators
    }

    const isDynamicValidationFn = typeof validations(newValidators) === 'function'

    vm.$options.validations = isDynamicValidationFn ? () => validations(newValidators)(vm) : validations(newValidators)

    addLifecycleHook(vm, 'created', created)
    addLifecycleHook(vm, 'beforeMount', beforeMount)
    addLifecycleHook(vm, 'mounted', mounted)
    addLifecycleHook(vm, 'beforeUpdate', beforeUpdate)
    addLifecycleHook(vm, 'updated', updated)
    addLifecycleHook(vm, 'beforeDestroy', beforeDestroy)
    addLifecycleHook(vm, 'destroyed', destroyed)

    const res = vm.$options.data.apply(vm)
    vm.$options.data = () => ({ ...res, ...data(vm) })
  }
}

export const ViewModelPlugin = {
  install(vue: Vue.VueConstructor, options: ViewModelConfig = {}) {
    vue.mixin({
      beforeCreate() {
        convertClassViewModelToOptionsAPI(this, options)
      },
    })
  },
}
