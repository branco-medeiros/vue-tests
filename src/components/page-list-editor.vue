<template>
  <div class="page-list-editor">
    <div class="p-grid p-align-center">
      <div class="p-col-fixed">
        <el-button circle type="success" icon="el-icon-plus" title="Novo" @click="onAdd"></el-button>
        <el-button circle type="warning" icon="el-icon-delete" title="Excluir" @click="onDelete"></el-button>
      </div>
      <div class="p-col p-grid p-align-center">
        <span class="p-col-fixed">Filtrar:</span>
        <el-input class="p-col" v-model="theFilter" />
        <div class="p-col-fixed">
          <el-button type="primary" @click="onFilter">Filtrar</el-button>
          <el-button @click="onClearFilter">Limpar filtro</el-button>
        </div>
      </div>
    </div>

    <div v-if="size>14" class="p-grid p-justify-center">
      <div class="p-col-fixed">
        <table-pagination v-bind="paginationProps" v-on="paginationEvents" />
      </div>
    </div>
    
    <div class="p-mb-sm-3">
      <el-table
        style = "width:100%"
        :data="itens"
        :row-class-name="getRowClass"
        border
        :stripe = "false"
        row-key="id"
        @sort-change="onSort"
        @selection-change="onSelection">
        <el-table-column type="selection" width="55" />

        <el-table-column
          v-for="col in cols"
          :key="col.name"
          :prop="col.name"
          :resizeable = "!col.fixed"
          :show-overflow-tooltip = "!col.multiline"
          :formatter = "col.formatter"
          :align = "col.alignment"
          :width = "col.width"
          :min-width = "col.minWidth"
          :header-align = "col.headerAlignment || 'center'"
          :sortable = "col.sorted? 'custom': false"
          :label = "col.label">

        </el-table-column>

        <el-table-column v-if="!hideEditCol" width="55">
          <template slot-scope="s">
            <el-button circle icon="el-icon-edit-outline" @click="onEdit(s.row)" title="Editar"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <div class="p-grid p-justify-center">
      <div class="p-col-fixed">
        <table-pagination v-bind="paginationProps" v-on="paginationEvents" />
      </div>
    </div>

    <el-dialog :visible.sync = "editing">
      

      <h3 slot="title">
        {{dialogTitle}} <span v-if="hasId" class="editing-id"># {{current.id}}</span>
      </h3>

      <span slot="footer">
        <el-button @click="onCancel">Cancelar</el-button>
        <el-button type="primary" @click="onSave = false">Salvar</el-button>
      </span> 
    </el-dialog>
  </div>
</template>
<script>
  import Vue from "vue"
  import "./table-pagination.vue"

  export default Vue.component("page-list-editor", {
    props: {
      page:Number,
      total:Number,
      cols:Array,
      itens:Array,
      filter:String,
      size:Number,
      col:String,
      order:String,
      item: Object,
      model: Object,
      hideEditCol: Boolean
    },

    data: function(){
      return {
        theFilter: this.filter,
        selected: [],
        current: null,
        editing: false,
        deleting: false
      }
    },

    watch: {
      filter: function(v){
        this.theFilter = v
      }
    },

    computed: {
      hasId: function(){
        return this.current && this.current.id
      },

      dialogTitle: function(){
        return this.hasId? "Editar" : "Novo"
      },

      pageSizes: function(){
        return [5, 10, 25, 50, 100, 200]
      },

      paginationProps: function(){
        return {
          size:this.size || this.pageSizes[1],
          page: this.page,
          total: this.total,
          sizes: this.pageSizes
        }
      },

      paginationEvents: function(){
        return {
          'size-change': this.onSizeChange.bind(this),
          'page-change': this.onPageChange.bind(this)
        }
      },
    },

    methods: {
      isCurrent: function(row){
        return row && this.current && row.id === this.current.id 
      },

      isSelected: function(row){
        return this.selected && this.selected.indexOf(row) >= 0
      },

      getRowClass: function(data){
        var row = data.row
        var current = this.isCurrent(row)
        var selected = this.isSelected(row)
        var deleting = this.deleting
        return (
          selected
            ? (deleting
              ? "deleting-row"
              : (current? "selected-current-row": "selected-row")
            ): (current? "current-row": null)
        )
      },

      onSelection: function(v){
        this.selected = v
      },

      onAdd: function(){
        var my = this;
        this.$emit("add", {ok: function(item){
          my.current = item
          my.editing = true
        }})
      },

      onDelete: function(){
        var selected = (this.selected && this.selected.length) || 0 
        if(!selected) return
        this.deleting = true
        var my = this
        this.$confirm(
          "Tem certeza que quer excluir " + (selected < 2? "este item": "estes itens") + "?",
          "Excluir", {
            confirmButtonText: "Ok, pode excluir",
            cancelButtonText: "Cancelar",
            type: "warning"
          }
        ).then(function(){
          my.$emit("delete", {itens:my.selected, done: function(){
            my.deleting = false
          }})
        }).catch(function(){
          my.deleting = false
        })
  
      },

      onEdit: function(row){
        this.current = row
        this.editing = true
      },

      onFilter: function(){
        this.onQuery(1, this.size, this.col, this.order, this.theFilter)
      },

      onCancel: function(){
        this.editing = false
      },
      
      onSave: function(){
        this.editing = false
      },

      onClearFilter: function(){
        this.theFilter = ""
        this.onQuery(1, this.size, this.col, this.order, this.theFilter)
      },

      onSizeChange: function(size){
        this.onQuery(1, size, this.col, this.order, this.theFilter)
      },

      onPageChange: function(page){
        this.onQuery(page, this.size, this.col, this.order, this.theFilter)
      },

      onSort: function(col, prop, order){
        this.onQUery(1, this.size, prop, order === "descending"? "desc": "asc")
      },

      onQuery: function(page, size, col, order, filter){
        this.$emit("query", {page, size, col, order, filter})
      },

    }
  
  })
</script>

<style>
  .el-table .current-row {
    background-color: hsl(210, 100%, 85%);
  }

  .el-table--enable-row-hover .el-table__body tr.current-row:hover > td {
    background-color: hsl(210, 100%, 80%);
  }

  .el-table .selected-current-row {
    background-color: hsl(180, 61%, 80%);
  }

  .el-table--enable-row-hover .el-table__body tr.selected-current-row:hover > td {
    background-color: hsl(180, 61%, 75%);
  }

  .el-table .deleting-row {
    background-color: hsl(0, 100%, 90%);
  }

  .el-table--enable-row-hover .el-table__body tr.deleting-row:hover > td {
    background-color: hsl(0, 100%, 85%);
  }

  .el-table .selected-row {
    background-color: hsl(60, 100%, 90%);
  }

  .el-table--enable-row-hover .el-table__body tr.selected-row:hover > td {
    background-color: hsl(60, 100%, 80%);
  }

</style>