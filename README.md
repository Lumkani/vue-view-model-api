# View Model API

![](https://img.shields.io/npm/v/@lumkani/view-model-api)
![](https://img.shields.io/npm/dw/@lumkani/view-model-api)
![](https://img.shields.io/github/issues/Lumkani/vue-view-model-api)

## Summary

An additive way of writing Vue components with dependency injection

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

#### Class-based Syntax
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

export { TextViewModel }
```
#### Object-literal syntax

```javascript
const TextViewModel = {
  data: () => ({
    text: null,
  }),
  mounted: async (vm) => {
    const textData = await someAPI()
    
    vm.text = textData
  }
}

export { TextViewModel }
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
