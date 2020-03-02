import {
  mapState,
  mapActions,
  mapMutations,
  mapGetters,
} from 'vuex'

interface ViewModelConfig {
  validators?: object;
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
  const { ViewModel = {} } = vm.$options
  const {
    methods = {},
    computed = {},
    vuex = {},
    watch = {},
    validations = () => ({}),
    data = () => ({}),
    constants = () => ({}),
    beforeCreate = () => {},
    created = () => {},
    beforeMount = () => {},
    mounted = () => {},
    beforeUpdate = () => {},
    updated = () => {},
    beforeDestroy = () => {},
    destroyed= () => {},
  } = ViewModel

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

    const { data: rootData = () => ({}) } = vm.$options

    vm.$options.data = () => ({ ...rootData.apply(vm), ...data(vm) })

    const constantsObject = constants(vm)
    const constantsKeys = Object.keys(constantsObject)

    for (const key of constantsKeys) {
      Object.defineProperty(vm, key, {
        value: Object.freeze(constantsObject[key]),
        writable: false,
        configurable: false,
        enumerable: false,
      })
    }

    const watchKeys = Object.keys(watch)

    for (const key of watchKeys) {
      vm.$options.watch[key] = (...args: unknown[]) => watch[key](vm, ...args)
    }
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
