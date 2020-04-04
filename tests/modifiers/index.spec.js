import { createLocalVue } from '@vue/test-utils'
import { ViewModelPlugin } from '../../src/plugin'

const localVue = createLocalVue()

localVue.config.silent = true

localVue.use(ViewModelPlugin, {
  modifiers: [
    (ctx) => {
      ctx.addToData({
        name: 'John',
        surname: 'Doe'
      })

      ctx.addToMethods({
        click() {
          this.name = 'Jane'
        }
      })

      ctx.addToComputed({
        fullname() {
          return `${this.name} ${this.surname}`
        }
      })
    }
  ]
})

describe('Test Modifiers', () => {
  test('Check if modifier add data to Vue instance', () => {
    const vm = new localVue({})

    expect(vm.name).toBe('John')
    expect(vm.surname).toBe('Doe')
  })

  test('Check if modifier add methods to Vue instance', () => {
    const vm = new localVue({})

    expect(vm).toHaveProperty('click')
    expect(typeof vm.click).toBe('function')
  })

  test('Check if modifier add computed props to Vue instance', () => {
    const vm = new localVue({})

    expect(vm.fullname).toBe('John Doe')
  })
})