import { createLocalVue } from '@vue/test-utils'
import { ViewModelPlugin } from '../../src/plugin'

const LocalVue = createLocalVue()

LocalVue.config.silent = true

LocalVue.use(ViewModelPlugin, {
  modifiers: [
    (ctx) => {
      ctx.addToData({
        name: 'John',
        surname: 'Doe',
      })

      ctx.addToMethods({
        click() {
          this.name = 'Jane'
        },
      })

      ctx.addToComputed({
        fullname() {
          return `${this.name} ${this.surname}`
        },
      })
    },
  ],
})

describe('Test Modifiers', () => {
  test('Check if modifier add data to Vue instance', () => {
    const vm = new LocalVue({})

    expect(vm.name).toBe('John')
    expect(vm.surname).toBe('Doe')
  })

  test('Check if modifier add methods to Vue instance', () => {
    const vm = new LocalVue({})

    expect(vm).toHaveProperty('click')
    expect(typeof vm.click).toBe('function')
    vm.click()
    expect(vm.name).toBe('Jane')
  })

  test('Check if modifier add computed props to Vue instance', () => {
    const vm = new LocalVue({})

    expect(vm.fullname).toBe('John Doe')
  })
})
