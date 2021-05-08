<template>
  <Layout></Layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "./views/layout/index.vue";

export default defineComponent({
  components: {
    Layout
  },
  name: "App"
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
