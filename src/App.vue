<template>
  <div>
    <!-- <router-link :to="{ path: '/' }">Home</router-link> | -->

    <SystemMessage />
    <router-view :key="$route.fullPath"></router-view>

  </div>
</template>

<script>
import SystemMessage from "./components/SystemMessage";

export default {
  created() { },
  methods: { },
  computed: { },
  components: {
    SystemMessage,
  },
};
</script>

<style>
footer {
   font-style: italic;
   font-size: 0.8em;
}
</style>
