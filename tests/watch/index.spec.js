import { createLocalVue } from '@vue/test-utils'
import { ViewModelPlugin } from '../../src/plugin'

const LocalVue = createLocalVue()

LocalVue.config.silent = true

LocalVue.use(ViewModelPlugin)

describe('Test Watchers', () => {
  test('Check if watcher is called when dependency changes', async () => {
    const watch = {
      name: () => {},
    }

    const watchSpy = jest.spyOn(watch, 'name')

    const vm = new LocalVue({
      ViewModel: {
        data: () => ({
          name: 'John',
        }),
        watch: {
          name: watch.name,
        },
      },
    })

    vm.name = 'Jane'

    await vm.$nextTick()

    const [[vmRef, newValue, oldValue]] = watchSpy.mock.calls

    expect(watchSpy).toBeCalledTimes(1)
    expect(vm._uid).toBe(vmRef._uid)
    expect(newValue).toBe('Jane')
    expect(oldValue).toBe('John')
  })
})
