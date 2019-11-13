# View Model API

## Summary

An alternative to the Options API that relies on dependancy injection

## Installation

```shell
$ yarn add @lumkani/view-model-api
```

```javascript
import Vue from 'vue'
import { ViewModelPlugin } from '@lumkani/view-model-api'

Vue.use(ViewModelPlugin)
```

## Basic Example

```javascript
class TextViewModel {
  static data = () => ({
    text: null
  })
  
  static mounted = async (vm) => {
    const textData = await someAPI()
    
    vm.text = textData
  }
}
```

```vue
<template>
  <p>{{ text }}</p>
</template>

<script>
import { TextViewModel as ViewModel } from './model'

export default { ViewModel }
</script>
```

## Motivation

Here at [Lumkani](https://lumkani.com), we love Vue as Vue is such an approachable frontend library or framework in some cases, but we found that if you want to test logic in a component you would need to mount the component just to test the logic and so with the ViewModel API, you can now write your logic without putting your JS in a Vue component

The benefits for the team:

1. A solid structure
2. Easier to test
3. Quicker to debug
4. Code reviews become easier
