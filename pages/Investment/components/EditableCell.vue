<template>
  <div>
    <a-input-number :min="100" :step="100" v-model="value" @change="onChange" />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: 100
      }
    },
    methods: {
      onChange(value) {
        this.$emit('change', value);
      },
    },
  }
</script>
