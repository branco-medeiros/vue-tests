export default {
  props: {
    options: Array,
    idKey: String,
    labelKey: String
  },

  computed: {
    itemId: function () {
      var my = this
      return function (v) {
        return my.getId(v)
      }
    },

    itemLabel: function () {
      var my = this
      return function (v) {
        return my.getLabel(v)
      }
    }
  },

  methods: {
    getId: function (v) {
      return v ? v[this.idKey || 'id'] : null
    },

    getLabel: function (v) {
      return v ? v[this.labelKey || 'label'] : null
    },

    getItemById: function (id) {
      return (id && this.options)? this.options.find(item => this.getId(item) === id) : null
    },

    import: function (v) {
      return this.getId(v)
    },

    export: function (v) {
      return this.getItemById(v)
    },

    changed: function(){
      return this.getId(this.value) !== this.getId(this.result)
    }


  },

  mounted: function(){
    this.load(this.value)
  }
}
