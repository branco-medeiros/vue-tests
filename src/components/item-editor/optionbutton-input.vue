<template>
  <el-radio-group v-model="result">
    <el-radio-button
      v-for = "option in options" 
      :key = "itemId(option)" 
      :label = "itemId(option)">
      {{itemLabel(option)}}
    </el-radio-button>
  </el-radio-group>
</template>

<script>
  import BaseMixin from "./base-mixin.js"
  import SelectionMixin from "./selection-mixin.js"
  import Vue from "vue"

  export default Vue.component("optionbutton-input", {
    mixins: [BaseMixin, SelectionMixin],
  })
</script>