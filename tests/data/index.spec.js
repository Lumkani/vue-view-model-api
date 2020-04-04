import { createLocalVue } from '@vue/test-utils'
import { ViewModelPlugin } from '../../src/plugin'

const localVue = createLocalVue()

localVue.config.silent = true

localVue.use(ViewModelPlugin)

describe('Test Data', () => {
  test('Data properties should update when reassigned', () => {
    const vm = new localVue({
      ViewModel: {
        data: () => ({
          value: 10
        })
      }
    })

    expect(vm.value).toBe(10)

    vm.value = 20

    expect(vm.value).toBe(20)
  })

  test('Data should be merged if defined on ViewModel and Options API', () => {
    const vm = new localVue({
      ViewModel: {
        data: () => ({
          value: 10
        })
      },
      data() {
        return {
          value2: 10,
        }
      }
    })

    expect(vm).toHaveProperty('value')
    expect(vm).toHaveProperty('value2')
  })
})