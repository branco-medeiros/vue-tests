<template>
  <div>
    <ul>
      <li v-for="route in routes" :key="route.path">
        <router-link :to="route.path">{{route.path}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "main-page",

  computed: {
    routes: function(){
      return this.$router.options.routes
    }
  }
}
</script>