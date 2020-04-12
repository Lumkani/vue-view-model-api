import { ViewModel, ViewModelPlugin } from './plugin'

if (window !== 'undefined') {
  window.ViewModel = ViewModel
  window.ViewModelPlugin = ViewModelPlugin
}

export { ViewModel, ViewModelPlugin }
