<template>
  <el-input v-model = "result"></el-input>
</template>

<script>
  import BaseMixin from "./base-mixin.js"
  import Vue from "vue" 
  import InputMask from "inputmask"

  export default Vue.component("masked-input", {
    mixins: [BaseMixin],
    props: {
      mask:String,
      maskAlwaysVisible: Boolean,

    },

    watch: {
      mask: function(){
        this.applyMask()
      }
    },

    computed: {
      unmaskedValue: function(){
        var ret = {}
        ret.v1 = this.result
        ret.v2 = this.mask
        ret.v3 = this.$maskedInput? this.$maskedInput.unmaskedvalue(): this.result
        return ret.v3
      },

      isComplete: function(){
        var ret = {}
        ret.v1 = this.result
        ret.v2 = this.mask
        ret.v3 = this.$maskedInput? this.$maskedInput.isComplete(): false
        return ret.v3
      }
    },

    mounted: function(){
      this.applyMask()
      //console.log("$maskedInput:", this.$maskedInput) 
    },

    beforeDestroy: function(){
      this.removeMask()
    },

    methods: {
      applyMask: function(){
        this.removeMask()
        this.$maskedInput = InputMask(this.mask).mask(this.$el.getElementsByTagName("INPUT")[0]);
      },

      removeMask: function(){
        if(this.$maskedInput){
          this.$maskedInput.remove()
          this.$maskedInput = null;
        }
      }

    }

  })

</script>