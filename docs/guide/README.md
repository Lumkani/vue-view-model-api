# Guide

## Core concepts

Let's start off very simple! Let's try taking a normal component and slowly start moving each concept into the ViewModel API. There isn't much to learn as you already know the core concepts, it's just wrapped up into a different form

Here we have a simple `<Select/>` component which makes use of `data`, `computed` and `mounted` properties

```vue
<template>
  <select v-model="selectedJSTool" @change="somethingWasSelected">
    <option value="vue.js">Vue.js</option>
    <option value="react.js">React.js</option>
    <option value="angular.js">Angular.js</option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      selectedJSTool: 'vue.js'
    }
  },
  computed: {
    isReactSelected() {
      return this.selectedJSTool === 'react.js'
    },
  },
  methods: {
    somethingWasSelected(value) {
      console.log(value)
    }
  },
  mounted() {
    console.log('What is the initial value of selectedJSTool', this.selectedJSTool)
  }
}
</script>
```

### 1. Create a JS file

First we need a JS file where we can store our `ViewModel` for the `<Select/>` component, it looks something like this:

```javascript
class SelectViewModel {

}

export { SelectViewModel }
```

### 2. Add ViewModel to Select component

Now after creating the page, we can import the `SelectViewModel` into our component

```vue{10,31}
<template>
  <select v-model="selectedJSTool">
    <option value="vue.js">Vue.js</option>
    <option value="react.js">React.js</option>
    <option value="angular.js">Angular.js</option>
  </select>
</template>

<script>
import { SelectViewModel as ViewModel } from './model'

export default {
  data() {
    return {
      selectedJSTool: 'vue.js'
    }
  },
  computed: {
    isReactSelected() {
      return this.selectedJSTool === 'react.js'
    },
  },
  methods: {
    somethingWasSelected(value) {
      console.log(value)
    }
  },
  mounted() {
    console.log('What is the initial value of selectedJSTool', this.selectedJSTool)
  },
  ViewModel,
}
</script>
```

### 3. Move mounted to ViewModel

We can create a static method with the same name as `mounted` and we now get the `this` as an parameter of the function called `vm`

:::warning
Remove `mounted` from the `<Select/>` component as it would clash
:::

```javascript{3}
class SelectViewModel {
  static mounted = (vm) => {
    console.log('What is the initial value of selectedJSTool', vm.selectedJSTool)
  }
}

export { SelectViewModel }
```

### 4. Move data to ViewModel

Just like the `data` function, you create a static method called `data`

:::tip
If you have `data` method in the component and in the `ViewModel` they will be merged together
:::

```javascript{2,3,4}
class SelectViewModel {
  static data = () => ({
    selectedJSTool: 'vue.js'
  })

  static mounted = (vm) => {
    console.log('What is the initial value of selectedJSTool', vm.selectedJSTool)
  }
}

export { SelectViewModel }
```
### 5. Move computed to ViewModel

```javascript{6,7,8}
class SelectViewModel {
  static data = () => ({
    selectedJSTool: 'vue.js'
  })

  static computed = {
    isReactSelected: (vm) => vm.selectedJSTool === 'react.js'
  }

  static mounted = (vm) => {
    console.log('What is the initial value of selectedJSTool', vm.selectedJSTool)
  }
}
```

### 6. Move methods to ViewModel

Methods are special as they need access to the `vm` and the emitted `event`

```javascript{10,11,12}
class SelectViewModel {
  static data = () => ({
    selectedJSTool: 'vue.js'
  })

  static computed = {
    isReactSelected: (vm) => vm.selectedJSTool === 'react.js'
  }

  static methods = {
    somethingWasSelected: (vm, event) => console.log(event)
  }

  static mounted = (vm) => {
    console.log('What is the initial value of selectedJSTool', vm.selectedJSTool)
  }
}
```

### The end result

Now we have an ultra lean component with all the logic in pure JavaScript

```vue
<template>
  <select v-model="selectedJSTool">
    <option value="vue.js">Vue.js</option>
    <option value="react.js">React.js</option>
    <option value="angular.js">Angular.js</option>
  </select>
</template>

<script>
import { SelectViewModel as ViewModel } from './model'

export default { ViewModel }
</script>
```