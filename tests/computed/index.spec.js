import { createLocalVue } from '@vue/test-utils'
import { ViewModelPlugin } from '../../src/plugin'

const localVue = createLocalVue()

localVue.config.silent = true

localVue.use(ViewModelPlugin)

describe('Test Computed', () => {
  test('Check if computed property reevaluates when a dependency changes', () => {
    const vm = new localVue({
      ViewModel: {
        data: () => ({
          name: '',
          surname: '',
        }),
        computed: {
          fullname: (vm) => `${vm.name} ${vm.surname}`
        }
      }
    })

    expect(vm.fullname).toBe(' ')

    vm.name = 'John'
    vm.surname = 'Doe'

    expect(vm.fullname).toBe('John Doe')
  })

  test('Check if computed properties are merged when defined on ViewModel and Options API', () => {
    const vm = new localVue({
      ViewModel: {
        data: () => ({
          name: 'John',
          surname: 'Doe',
        }),
        computed: {
          fullname: (vm) => `${vm.name} ${vm.surname}`
        }
      },
      computed: {
        fullname2() {
          return `${this.name} ${this.surname}`
        }
      }
    })

    expect(vm.fullname).toBe('John Doe')
    expect(vm.fullname2).toBe('John Doe')
  })
})