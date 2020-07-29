<template>
  <el-input type="textarea" :rows="rows" v-model="result"></el-input>
</template>

<script>
  import BaseMixin from "./base-mixin.js"
  import Vue from "vue" 

  export default Vue.component("textarea-input", {
    mixins:[BaseMixin],
    
    props: {
      rows: Number
    }
  })
</script>