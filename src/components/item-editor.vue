<script>

  const BaseMixin = {
    props: {
      name: String,
      key:String,
      value: null,
      errorMessage: String,
      required: Boolean,
      width: [String, Number],
      rules: Array
    },

    data: function(){
      return {
        result: this.import(this.value),
        error: this.errorMessage
      }
    },

    watch: {
      value: function(v){
        this.load(v)
      },

      errorMessage: function(v){
        this.error = v
      }
    },

    methods: {
      import: function(v){
        return v;
      },

      export: function(v){
        return v
      },

      load: function(v){
        this.result = this.import(v)
      },

      save: function(){
        this.$emit("update:value", this.export(this.result))
      },

      reset: function(){
        this.load(this.value)
      },

      changed: function(){
        return this.result !== this.value
      },

      validate: function(){
        return null
      },

      onInput: function(v){
        this.result = v
      }


    }
  }

  const SelectorMixin = {
    props:{
      options: Array,
      itemId: String,
      itemLabel: String 
    },

    computed: {
      itemId: function(){
        var my = this
        return function(v){
          return my.getId(v)
        }
      },

      itemLabel: function(){
        var my = this
        return function(v){
          return my.getLabel(v)   
        }
      }
    },

    methods: {
      getId: function(v){
        return v? v[this.itemId || 'id'] : null
      },

      getLabel: function(v){
        return v? v[this.itemLabel || 'label']: null
      },

      getItemById: function(id){
        return id? this.options.find(item => this.getId(item) === id) : null
      },

      import:function(v){
        return this.getId(v)
      },

      export: function(v){
        return this.getItemById(v)
      },


    }
  }

  var TextInput = Vue.component("text-input", {
    mixins: [BaseMixin],

    render: function(h){
      return h("el-input", {props:{value:this.result}, on:{input: this.onInput.bind(this)}})
    },

  })

  var TextAreaInput = Vue.component("textarea-input", {
    mixins: [BaseMixin],
    props: {
      rows: Number
    },

    render: function(h){
      return h("el-input", {props:{rows: this.rows, type:'textarea', value: this.result}, on:{input:this.onInput.bind(this)}} )
    }

  })

  var CheckBoxInput = Vue.component("checkbox-input", {
    mixins: [BaseMixin, SelectorMixin],

    props:{
      value:Array
    },

    data: function(){
      return {
        result: []
      }
    },

    methods: {
      import: function(v){
        return v? v.map(item => this.getId(item)) : [] 
      },

      export: function(v){
        return (v && v.length)? v.map(id => this.getItemById(id)) : []
      }
    },


    render: function(h){
      var my = this
      return h("el-checkbox-group", 
        {
          props:{value: this.result}, 
          on:{change: onInput.bind(this)}
        },
        this.options.map(function(item){
          var k = my.getId(item)
          return h("el-check-box", {props: {label: k, key: k} }, [my.getLabel(item)])
        })
      )
    }
    
  })
</script>