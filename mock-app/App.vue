<template>
  <div>
    <input v-model="name">
    <p>{{ name }}</p>
    {{ $v }}
  </div>
</template>

<script>
import required from 'vuelidate/lib/validators/required'
import maxLength from 'vuelidate/lib/validators/maxLength'

export default {
  ViewModel: {
    data: () => ({
      name: null
    }),
    validations: () => ({
      name: {
        required,
        maxLength: maxLength(10)
      }
    }),
  },
}
</script>