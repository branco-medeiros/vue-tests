<template>
  <el-checkbox-group v-model="result">
    <el-checkbox-button
      v-for = "option in options" 
      :key = "itemId(option)" 
      :label = "itemId(option)">
      {{itemLabel(option)}}
    </el-checkbox-button>
  </el-checkbox-group>
</template>

<script>
  import BaseMixin from "./base-mixin.js"
  import SelectionMixin from "./selection-mixin.js"
  import ArraySelectionMixin from "./array-selection-mixin.js"
  import Vue from "vue" 

export default Vue.component("checkbutton-input", {
  mixins: [BaseMixin, SelectionMixin, ArraySelectionMixin],

})
</script>

