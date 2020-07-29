export default {
  props: {
    value: Array
  },

  data: function () {
    return {
      result: []
    }
  },

  methods: {
    import: function (v) {
      return (v && v.length) ? v.map(item => this.getId(item)) : []
    },

    export: function (v) {
      return (v && v.length) ? v.map(key => this.getItemById(key)) : []
    },

    changed: function(){
      var r1 = this.result || []
      var r2 = this.import(this.value)

      if(r1.length === r2.length){
        for(var i=r1.length-1; i >= 0; --i){
          if(r1[i] !== r2[i]) return true
        }
        return false
      }
      return true
    }
  }

}