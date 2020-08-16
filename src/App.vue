<template>
  <div id="app" class="p-grid p-align-stretch">
    <div class="p-col p-grid p-align-stretch" style="flex-wrap:nowrap; max-width:100vw">
      <div class="p-col-fixed side-bar center">
        <img alt="Vue logo" src="./assets/logo.png">
      </div>
      <div class="p-col">
        <router-view ref="view" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin:0;
  padding:0;
}

#app {
  padding: 1em;
  min-height:100vh;
  box-sizing: border-box;
}

.center {
  text-align: center;
}

.side-bar {
  width: 300px;
  background-color: darkgray;
}


</style>
