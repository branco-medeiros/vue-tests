<template>
  <el-select v-model="result" filterable style="width:100%">
    <el-option :value = "null" v-if="selectMessage" :label = "selectMessage"></el-option>
    <el-option 
      v-for = "option in options"
      :key = "itemId(option)"
      :value = "itemId(option)"
      :label = "itemLabel(option)">
    </el-option>
  </el-select>
</template>

<script>
  import BaseMixin from "./base-mixin.js"
  import SelectionMixin from "./selection-mixin.js"
  import Vue from "vue"

  export default Vue.component("selection-input", {
    mixins: [BaseMixin, SelectionMixin],

    props:{
      selectMessage: String
    }
  })
</script>