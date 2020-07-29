<template>
  <div> 
    <b>{{name}}</b> <el-button size="small" @click="onSaveClick">Save</el-button>
    <slot></slot>
    <div class="p-my-2">
      <component ref="it" :is="name" v-bind="{...props}" @update = "result = $event" @update:value="onSave"></component>
    </div>
    <div class="p-mb-3">
      {{result}}
    </div>
  </div>
</template>

<script>
import Vue from "vue"
export default Vue.component("editor-test", {
  props: {
    name:String,
    props: Object
  },

  data(){
    return {
      result:null
    }
  },

  methods: {
    onSave(value){
      this.$emit("save", value)
    },

    onSaveClick(){
      this.$refs.it.save()
    },

    it(){
      return this.$refs.it
    }
  }
})
</script>