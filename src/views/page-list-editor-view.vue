<template>
  <page-list-editor
    ref="editor"
    :itens="itens"
    :total="total"
    :page="page"
    :size="size"
    :cols="cols">
  </page-list-editor>  
</template>
<script>
import "../components/page-list-editor.vue"
export default {
  name:"page-list-editor-view",
  data: function(){
    return {
      total: 1000,
      size: 10,
      page:2,
      itens:[
        {id:1, name: "Batman", superpower: "is rich", created: new Date(1960, 11, 10)},
        {id:2, name: "Superman", superpower: "flying, super force, x-ray vision, heat-vision", created: new Date(1947, 5, 1)},
        {id:3, name: "Spiderman", superpower: "super force, silk-emit, spider-sense, wall-climbing", created: new Date(1962, 4, 21)},
        {id:4, name: "Wonder woman", superpower: "super force, inteligence", created: new Date(1923, 0, 11)},
        {id:5, name: "Mickey", superpower: "wit", created: new Date(1932, 2, 8)},
        {id:6, name: "Brucutu", superpower: "none", created: new Date(1978, 7, 22)},
        {id:7, name: "Mônica", superpower: "super force", created: new Date(1968, 8, 9)},
        {id:8, name: "The Spirit", superpower: "none", created: new Date(1947, 3, 12)},
      ],
      cols: [
        {name:"name", label: "Nome"},
        {name: "superpower", label: "Super Power"},
        {name: "created", label: "Data de Criação", alignment: "center", formatter: this.formatDate}
      ]
    }
  },

  methods: {
    pad: function(value, count, char){
      char = char || " "
      value = value + ""
      var right = true
      if(count < 0){ right = false; count = -count}
      if(value.length >= count) return value
      var p = new Array(count + 1).join(char)
      return right? (value + p).substr(0, count) : (p + value).substr(-count) 
    },

    formatDate: function(row, col, value){
      var pad = this.pad
      if(!value || value.constructor !== Date) return value
      return pad(value.getDate(), -2, "0") + "/" 
        + pad(value.getMonth() + 1, -2, "0") + "/"
        + pad(value.getFullYear(), -4, "0")
    }
  }
}
</script>