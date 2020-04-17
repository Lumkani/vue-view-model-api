import { createLocalVue } from '@vue/test-utils'
import { ViewModel } from '../../src/plugin'

describe('Test Watchers', () => {
  test('Tested installed attribute is true and called only once if installed more than once', async () => {
    const LocalVue = createLocalVue()

    jest.spyOn(LocalVue, 'mixin')

    LocalVue.config.silent = true

    ViewModel.install(LocalVue)
    ViewModel.install(LocalVue)

    expect(ViewModel.install.installed).toBe(true)
    expect(LocalVue.mixin).toBeCalledTimes(1)
  })
})
