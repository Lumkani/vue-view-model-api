---
meta:
  - name: description
    content: Modifiers allow you to build whatever features on top of the ViewModel API 
---

# Modifiers <Badge text="+v2.5.0" />

*Modifiers* is a new concept that was introduced in `v2.5.0`, it is essentially an API that is exposed to allow you to add your own modifications to the ViewModel API. 

The goal of the ViewModel is to map the existing Options API to a more dependency-injectable one. This means that the ViewModel API does not include anything that is not apart of the Vue's core such as *Vuex*, *Vue Router* and etc...

Modifiers gives you the power to build your own integrations so that it can be accessible in the style of the ViewModel API

## Example

Let's say that you want to be able use Vuex within the ViewModel API, we can do this with modifiers

```javascript
import Vue from 'vue'
import { ViewModelPlugin } from '@lumkani/view-model-api'
import { mapState, mapGetters mapMutations, mapActions } from 'vuex'

const addVuex = (ctx) => {
  const { vuex = {} } = ctx.ViewModel
  const {
    state = {},
    getters = {},
    mutations = {}
    actions = {}
  } = vuex

  ctx.addToComputed({
    ...mapState(state),
    ...mopGetters(getters)
  })

  ctx.addToMethods({
    ...mapMutations(mutations),
    ...mapActions(actions)
  })
}

Vue.use(ViewModelPlugin, {
  modifiers: [addVuex]
})


new Vue({
  el: '#app'
})
```

Now you can do this within your ViewModel, there you go, you built a plugin for a plugin :sweat_smile:

```javascript
class ViewModel {
  static vuex = {
    state: {
      name: (state) => state.name
    },
    ...
    ...
  }
}
```
