<template>
  <el-checkbox-group v-model="result" class="p-grid p-nogutter" :class = "{'p-dir-col': lineBreaks}">
    <el-checkbox class="p-col-fixed"
      v-for = "option in options" 
      :key = "itemId(option)" 
      :label = "itemId(option)">
      {{itemLabel(option)}}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
  import BaseMixin from "./base-mixin.js"
  import SelectionMixin from "./selection-mixin.js"
  import ArraySelectionMixin from "./array-selection-mixin.js"
  import Vue from "vue" 

export default Vue.component("checkbox-input", {
  mixins: [BaseMixin, SelectionMixin, ArraySelectionMixin],

  props: {
    lineBreaks: Boolean
  },

})
</script>
