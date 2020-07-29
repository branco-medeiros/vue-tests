<template>
  <el-input v-model="result"></el-input>
</template>

<script>
  import BaseMixin from "./base-mixin.js"
  import Vue from "vue" 

  export default Vue.component("text-input", {
    mixins: [BaseMixin]
  })
</script>