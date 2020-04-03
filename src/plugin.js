const addLifecycleHook = (vm, hookName, hook) => {
  if (Array.isArray(vm.$options[hookName])) {
    vm.$options[hookName] = [
      ...vm.$options[hookName],
      async () => hook(vm),
    ]
  } else {
    vm.$options[hookName] = [async () => hook(vm)]
  }
}

const addWatchers = (vm, watchers) => {
  const watchKeys = Object.keys(watchers)

  if (vm.$options.watch === undefined) {
    vm.$options.watch = {}
  }

  for (const key of watchKeys) {
    vm.$options.watch[key] = (...args) => watchers[key](vm, ...args)
  }
}

const convertClassViewModelToOptionsAPI = (vm, options) => {
  const { ViewModel = {} } = vm.$options
  const {
    data = () => ({}),
    methods = {},
    computed = {},
    watch = {},
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
    .map(option => Object.keys(option).reduce((result, val) => ({
      ...result,
      [val]: (...args) => option[val](vm, ...args),
    }), {}))
    
    vm.$options.methods = {
      ...vm.$options.methods,
      ...newMethods,
    }
    
    vm.$options.computed = {
      ...vm.$options.computed,
      ...newComputedProps,
    }
    
    addLifecycleHook(vm, 'created', created)
    addLifecycleHook(vm, 'beforeMount', beforeMount)
    addLifecycleHook(vm, 'mounted', mounted)
    addLifecycleHook(vm, 'beforeUpdate', beforeUpdate)
    addLifecycleHook(vm, 'updated', updated)
    addLifecycleHook(vm, 'beforeDestroy', beforeDestroy)
    addLifecycleHook(vm, 'destroyed', destroyed)
    
    const constantsObject = constants(vm)
    const constantsKeys = Object.keys(constantsObject)
    
    const { data: rootData = () => ({}) } = vm.$options
    vm.$options.data = () => ({ ...rootData.apply(vm), ...data(vm) })

    for (const key of constantsKeys) {
      Object.defineProperty(vm, key, {
        value: Object.freeze(constantsObject[key]),
        writable: false,
        configurable: false,
        enumerable: false,
      })
    }

    addWatchers(vm, watch)
  }
}

export const ViewModelPlugin = {
  install(vue, options = {}) {
    const { modifiers = [] } = options

    vue.mixin({
      beforeCreate() {
        const { ViewModel = {} } = this.$options

        const vm = this

        for (const modifier of modifiers) {
          
          modifier({
            vm,
            ViewModel,
            addToMethods(methods) {
              vm.$options.methods = {
                ...vm.$options.methods,
                ...methods,
              }
            },
            addToComputed(computed) {
              vm.$options.computed = {
                ...vm.$options.computed,
                ...computed
              }
            },
          })
        }

        convertClassViewModelToOptionsAPI(vm, options)
      },
    })
  },
}
