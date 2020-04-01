<template>
  <p>{{ name }}</p>
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
      }, 3000)
    }
  }
}
</script>