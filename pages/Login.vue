<template>
  <div></div>
</template>

<script>

  export default {
    mounted() {
      this.getPage();
    },
    methods: {
      getPage() {
        window.location.href="http://localhost:3000/api/pub/login"
      }
    }
  };
</script>