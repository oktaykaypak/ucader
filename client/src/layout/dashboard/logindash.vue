<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'TheContainer',
  components: {

  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>