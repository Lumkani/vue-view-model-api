import { createLocalVue } from '@vue/test-utils'
import { ViewModel } from '../../src/plugin'

const LocalVue = createLocalVue()

LocalVue.config.silent = true

LocalVue.use(ViewModel)

describe('Test Methods', () => {
  test('Can call a method declared on the ViewModel and update state', () => {
    const methods = {
      click: (vm) => {
        vm.isUpdated = true
      },
    }

    const clickSpy = jest.spyOn(methods, 'click')

    const vm = new LocalVue({
      ViewModel: {
        data: () => ({
          isUpdated: false,
        }),
        methods: {
          click: methods.click,
        },
      },
    })

    vm.click()

    const [[vmRef]] = clickSpy.mock.calls

    expect(clickSpy).toBeCalledTimes(1)
    expect(vm.isUpdated).toBe(true)
    expect(vm._uid).toBe(vmRef._uid)

    vm.$destroy()
  })

  test('Can pass in arguments to method defined on ViewModel', () => {
    const methods = {
      click: (vm, ...args) => {
        vm.args = args
      },
    }

    const args = ['a', 'b', 'c']

    const clickSpy = jest.spyOn(methods, 'click')

    const vm = new LocalVue({
      ViewModel: {
        data: () => ({
          args: [],
        }),
        methods: {
          click: methods.click,
        },
      },
    })

    vm.click(...args)

    const [[vmRef]] = clickSpy.mock.calls

    expect(vm.args).toMatchObject(args)
    expect(vm._uid).toBe(vmRef._uid)

    vm.$destroy()
  })

  test('Methods should be merged when defined on ViewModel and Options API', () => {
    const methods = {
      click: () => {},
    }

    const clickSpy = jest.spyOn(methods, 'click')

    const vm = new LocalVue({
      ViewModel: {
        methods: {
          click: methods.click,
        },
      },
      methods: {
        click2: methods.click,
      },
    })

    vm.click()
    vm.click2()

    const [[vmRef]] = clickSpy.mock.calls

    expect(clickSpy).toBeCalledTimes(2)
    expect(vm._uid).toBe(vmRef._uid)
  })
})
