<template>
  <div>
    <p><strong>Vuelidate example - Max length 10</strong></p>
    <label for="name">Name: </label>
    <input id="name" v-model="name">
    <p>Name Value: {{ name }}</p>
    <p v-if="$v.name.$invalid">Invalid Value<p>
    <p v-if="!$v.name.$invalid">Valid Value<p>
    <p><strong>Vulidate name object</strong></p>
    {{ $v }}

    <p><strong>Constant example</strong></p>
    <label for="constant">constant: </label>
    <input id="constant" v-model="MY_CONTSTANT">
    <p>Constant value: {{ MY_CONTSTANT }}</p>
    <p>* If you change the contsnat value, check your console for errors</p>
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
    constants: () => ({
      MY_CONTSTANT: 'SHOULD NOT CHANGE'
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