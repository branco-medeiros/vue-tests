<template>
  <el-pagination 
    :page-size = "size"
    :total = "total"
    :current-page = "page"
    :page-sizes = "sizes"
    background 
    hide-on-single-page
    @size-change = "onSizeChange"
    @current-change = "onCurrentChange"
    layout = "total, prev, pager, next, sizes">
  </el-pagination>
</template>
<script>
  import Vue from "vue"

  export default Vue.component("table-pagination",{
    props: {
      sizes:Array,
      page:Number,
      total:Number,
      size:Number
    },
    methods: {
      onSizeChange: function(size){
        this.$emit("size-change", size)
      },

      onCurrentChange: function(page){
        this.$emit("current-change", page)
      }
    }
  })
</script>