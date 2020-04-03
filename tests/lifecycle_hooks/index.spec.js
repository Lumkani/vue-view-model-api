import { createLocalVue } from '@vue/test-utils'
import { ViewModelPlugin } from '../../src/plugin'

const localVue = createLocalVue()

localVue.config.silent = true

localVue.use(ViewModelPlugin)

const lifecycleHooks = {
  beforeCreate: () => {},
  created: () => {},
  beforeMount: () => {},
  mounted: () => {},
  beforeUpdate: () => {},
  updated: () => {},
  beforeDestroy: () => {},
  destroyed: () => {},
}

describe('Test lifecycle hooks', () => {
  test('[ beforeCreate ] should be called', () => {
    const beforeCreateHookSpy = jest.spyOn(lifecycleHooks, 'beforeCreate')

    const vm = new localVue({
      ViewModel: {
        beforeCreate: lifecycleHooks.beforeCreate,
      }
    })

    const [[ vmRef ]] = beforeCreateHookSpy.mock.calls

    expect(beforeCreateHookSpy).toBeCalledTimes(1)
    expect(vmRef._uid).toBe(vm._uid)

    vm.$destroy()
  })

  test('[ created ] should be called', () => {
    const createdHookSpy = jest.spyOn(lifecycleHooks, 'created')

    const vm = new localVue({
      ViewModel: {
        created: lifecycleHooks.created
      }
    })

    const [[ vmRef ]] = createdHookSpy.mock.calls

    expect(createdHookSpy).toBeCalledTimes(1)
    expect(vmRef._uid).toBe(vm._uid)

    vm.$destroy()
  })

  test('[ beforeMount ] should be called', () => {
    const beforeMountHookSpy = jest.spyOn(lifecycleHooks, 'beforeMount')

    document.body.innerHTML = `<div id="app"></div>`

    const vm = new localVue({
      el: document.querySelector('#app'),
      render: (h) => (<span>Hello World</span>),
      ViewModel: {
        beforeMount: lifecycleHooks.beforeMount,
      },
    })

    const [[ vmRef ]] = beforeMountHookSpy.mock.calls

    expect(beforeMountHookSpy).toBeCalledTimes(1)
    expect(vmRef._uid).toBe(vm._uid)

    vm.$destroy()
  })

  test('[ mounted ] should be called', () => {
    const mountedHookSpy = jest.spyOn(lifecycleHooks, 'mounted')

    document.body.innerHTML = `<div id="app"></div>`

    const vm = new localVue({
      el: document.querySelector('#app'),
      render: (h) => (<span>Hello World</span>),
      ViewModel: {
        mounted: lifecycleHooks.mounted,
      },
    })

    const [[ vmRef ]] = mountedHookSpy.mock.calls

    expect(mountedHookSpy).toBeCalledTimes(1)
    expect(vmRef._uid).toBe(vm._uid)

    vm.$destroy()
  })

  test('[ beforeUpdate ] should be called', async () => {
    const beforeUpdateHookSpy = jest.spyOn(lifecycleHooks, 'beforeUpdate')

    document.body.innerHTML = `<div id="app"></div>`

    const vm = new localVue({
      el: document.querySelector('#app'),
      render(h) {
        return (<span>{this.isUpdated}</span>)
      },
      ViewModel: {
        data: () => ({
          isUpdated: false,
        }),
        beforeUpdate: lifecycleHooks.beforeUpdate,
        mounted(vm) {
          vm.isUpdated = true
        }
      },
    })

    await vm.$nextTick()

    const [[ vmRef ]] = beforeUpdateHookSpy.mock.calls

    expect(beforeUpdateHookSpy).toBeCalledTimes(1)
    expect(vm.isUpdated).toBe(true)
    expect(vmRef._uid).toBe(vm._uid)

    vm.$destroy()
  })

  test('[ updated ] should be called', async () => {
    const updatedHookSpy = jest.spyOn(lifecycleHooks, 'updated')

    document.body.innerHTML = `<div id="app"></div>`

    const vm = new localVue({
      el: document.querySelector('#app'),
      render(h) {
        return (<span>{this.isUpdated}</span>)
      },
      ViewModel: {
        data: () => ({
          isUpdated: false,
        }),
        updated: lifecycleHooks.updated,
        mounted(vm) {
          vm.isUpdated = true
        }
      },
    })

    await vm.$nextTick()

    const [[ vmRef ]] = updatedHookSpy.mock.calls

    expect(updatedHookSpy).toBeCalledTimes(1)
    expect(vm.isUpdated).toBe(true)
    expect(vmRef._uid).toBe(vm._uid)

    vm.$destroy()
  })

  test('[ beforeDestroy ] should be called', () => {
    const beforeDestroyHookSpy = jest.spyOn(lifecycleHooks, 'beforeDestroy')

    const vm = new localVue({
      ViewModel: {
        beforeDestroy: lifecycleHooks.beforeDestroy
      },
    })

    vm.$destroy()

    const [[ vmRef ]] = beforeDestroyHookSpy.mock.calls

    expect(beforeDestroyHookSpy).toBeCalledTimes(1)
    expect(vmRef._uid).toBe(vm._uid)
  })

  test('[ destroyed ] should be called', () => {
    const destroyHookSpy = jest.spyOn(lifecycleHooks, 'destroyed')

    const vm = new localVue({
      ViewModel: {
        destroyed: lifecycleHooks.destroyed
      },
    })

    vm.$destroy()

    const [[ vmRef ]] = destroyHookSpy.mock.calls

    expect(destroyHookSpy).toBeCalledTimes(1)
    expect(vmRef._uid).toBe(vm._uid)
  })

  test('No hooks should be called if none are added to the ViewModel object', () => {
    const hooks = Object.keys(lifecycleHooks)

    const hookSpies = []

    hooks.forEach((hook) => {
      hookSpies.push(jest.spyOn(lifecycleHooks, hook))
    })

    const vm = new localVue({
      ViewModel: {
        destroyed: lifecycleHooks.destroyed
      },
    })

    hookSpies.forEach((hookSpy) => {
      expect(hookSpy).not.toBeCalledTimes(1)
    })
  })
})
