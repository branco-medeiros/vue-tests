<template>
  <el-radio-group v-model="result" class="p-grid p-nogutter" :class = "{'p-dir-col': lineBreaks}">
    <el-radio class="p-col-fixed"
      v-for = "option in options" 
      :key = "itemId(option)" 
      :label = "itemId(option)">
      {{itemLabel(option)}}
    </el-radio>
  </el-radio-group>
</template>

<script>
  import BaseMixin from "./base-mixin.js"
  import SelectionMixin from "./selection-mixin.js"
  import Vue from "vue"

  export default Vue.component("option-input", {
    mixins: [BaseMixin, SelectionMixin],

    props:{
      lineBreaks: Boolean
    }
  })
</script>