import { createLocalVue } from '@vue/test-utils'
import { ViewModel } from '../../src/plugin'

const LocalVue = createLocalVue()

LocalVue.config.silent = true

LocalVue.use(ViewModel)

describe('Test Computed', () => {
  test('Check if computed property reevaluates when a dependency changes', () => {
    const vm = new LocalVue({
      ViewModel: {
        data: () => ({
          name: '',
          surname: '',
        }),
        computed: {
          fullname: (vm) => `${vm.name} ${vm.surname}`,
        },
      },
    })

    expect(vm.fullname).toBe(' ')

    vm.name = 'John'
    vm.surname = 'Doe'

    expect(vm.fullname).toBe('John Doe')
  })

  test('Check if computed properties are merged when defined on ViewModel and Options API', () => {
    const vm = new LocalVue({
      ViewModel: {
        data: () => ({
          name: 'John',
          surname: 'Doe',
        }),
        computed: {
          fullname: (vm) => `${vm.name} ${vm.surname}`,
        },
      },
      computed: {
        fullname2() {
          return `${this.name} ${this.surname}`
        },
      },
    })

    expect(vm.fullname).toBe('John Doe')
    expect(vm.fullname2).toBe('John Doe')
  })
})
