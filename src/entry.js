import { ViewModelPlugin, ViewModel } from './plugin'

if (window !== 'undefined') {
  window.ViewModelPlugin = ViewModelPlugin
  window.ViewModel = ViewModel
}

export { ViewModelPlugin, ViewModel }
