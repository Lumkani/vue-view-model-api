<template>
  <p>{{ name }} {{ hello }}</p>
</template>

<script>
export default {
  ViewModel: {
    data: () => ({
      name: "Shailen"
    }),
    mounted(vm) {
      setTimeout(() => {
        vm.name = "Liam"
        vm.helloUpdate()
      }, 3000)
    },
    vuex: {
      state: {
        hello: (state) => state.hello, 
      },
      mutations: ['helloUpdate'],
    }
  }
}
</script>