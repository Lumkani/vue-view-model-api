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
    const originalWatcher = vm.$options.watch[key]

    let array = []

    if (originalWatcher !== undefined) {
      if (!Array.isArray(originalWatcher)) {
        array = [originalWatcher]
      } else {
        array = originalWatcher
      }
    }

    vm.$options.watch[key] = [
      (...args) => watchers[key](vm, ...args),
      ...array,
    ]
  }
}

const convertClassViewModelToOptionsAPI = (vm) => {
  const { ViewModel = {} } = vm.$options
  const {
    data = () => ({}),
    methods = {},
    computed = {},
    watch = {},
    beforeCreate = () => {},
    created = () => {},
    beforeMount = () => {},
    mounted = () => {},
    beforeUpdate = () => {},
    updated = () => {},
    beforeDestroy = () => {},
    destroyed = () => {},
    activated = () => {},
    deactivated = () => {},
    errorCaptured = () => {},
  } = ViewModel


  beforeCreate(vm)

  if (Object.keys(ViewModel).length) {
    const [newMethods, newComputedProps] = [methods, computed]
      .map((option) => Object.keys(option).reduce((result, val) => ({
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
    addLifecycleHook(vm, 'activated', activated)
    addLifecycleHook(vm, 'deactivated', deactivated)
    addLifecycleHook(vm, 'errorCaptured', errorCaptured)

    const { data: rootData = () => ({}) } = vm.$options
    vm.$options.data = () => ({ ...rootData.apply(vm), ...data(vm) })

    addWatchers(vm, watch)
  }
}

const plugin = {
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
            addToData(data) {
              const { data: rootData = () => ({}) } = vm.$options

              vm.$options.data = () => ({
                ...rootData.apply(vm),
                ...data,
              })
            },
            addToMethods(methods) {
              vm.$options.methods = {
                ...vm.$options.methods,
                ...methods,
              }
            },
            addToComputed(computed) {
              vm.$options.computed = {
                ...vm.$options.computed,
                ...computed,
              }
            },
          })
        }

        convertClassViewModelToOptionsAPI(vm, options)
      },
    })
  },
}

// eslint-disable-next-line no-console
console.warn('The export "ViewModel" is now deprecated and will be removed in the next release, please use the export "ViewModel" instead')

const ViewModel = plugin
const ViewModel = plugin

export {
  ViewModel,
  ViewModel,
}
