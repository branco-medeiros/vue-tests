export default {
  props: {
    value: null
  },

  data: function () {
    return  {
      result: this.import(this.value)
    }
  },

  watch: {
    value: function (v) {
      this.load(v)
    },

    result: function(v){
      this.$emit("update", v)
    }

  },

  methods: {
    import: function (v) {
      return v;
    },

    export: function (v) {
      return v
    },

    load: function (v) {
      this.result = this.import(v)
    },

    save: function () {
      this.$emit("update:value", this.export(this.result))
    },

    reset: function () {
      this.load(this.value)
    },

    changed: function () {
      return this.result !== this.value
    },

    validate: function () {
      return null
    },

    onInput: function (v) {
      this.result = v
    }


  }
}
