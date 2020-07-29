<template>
  <table-pagination
    :size.sync="size"
    :sizes="[5, 10, 15, 100, 200]"
    :page.sync="page"
    :total="total">
  </table-pagination>
</template>
<script>
import "../components/table-pagination.vue"
export default {
  name:"table-pagination-view",
  data: function(){
    return {
      page: 10,
      size: 10,
      total: 1000
    }
  }
}
</script>