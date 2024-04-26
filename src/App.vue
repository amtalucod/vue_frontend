<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import router from "./router";
import Header from "./components/Header.vue";
export default {
  name: "App",
  router,
  components: {
    Header,
  },
};
</script>

<style>
/* Add your global styles here */
</style>
