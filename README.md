## Vue - ViewModel API

The ViewModel API is an attempt to solve some of the challenges that we face when testing Vue applications.

In many cases, we tend to put our business logic into out components so if we just want to test a `method` you have to go through the process of mounting your component. We come out with this solution at Lumkani which allows us to inject a Vue instance into what ever we need, so we don't have to rely on `this`

### Basic example

#### Before

```vue
<template>
  <p>{{ text }}</p>
</template>

<script>
export default {
  data() {
    return {
      text: null
    }
  },
  async mounted() {
    this.text = await apis.someText()
  }
}
</script>
```

#### After

```vue
<template>
  <p>{{ text }}</p>
</template>

<script>
import { TextViewModel as ViewModel } from './model'
export default { ViewModel }
</script>
```

```javascript
class TextViewModel {
  static data = () => ({
    text: null,
  })

  static mounted = async (vm) => {
    vm.text = await apis.someText()
  }
}

export { TextViewModel }
```

Now we are capable of dependency injection, so if we want to test the `mounted` function from the `TextViewModel` we can just do this:

```javascript
import { TextViewModel as ViewModel } from './model'

jest.mock('./apis')

describe('Test TextViewModel', () => {
  test('should update text property', async () => {
    apis.someText.mockResolvedValue('Hello World')

    const vm = {
      text: null
    }

    await ViewModel.mounted(vm)

    expect(vm.text).toBe('Hello World')
  })
})
```