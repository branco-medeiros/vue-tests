<template>
  <el-form  :label-width = "labelWidth" :label-position = "labelPosition" ref="form">
    <el-form-item :label = "label" :error = "error" :required = "required">
      <div>
        <el-select v-model="value" filterable @update:value="onUpdate" @change="onChange" @input="onInput" style="width:100%">
          <el-option :value="null">{{selectMessage}}</el-option>
          <el-option
            v-for = "option in options"
            :key = "option.id"
            :value = "option.id"
            :label = "option.value">
          </el-option> 
        </el-select>
      </div>
    </el-form-item>
    <div>
      {{value}}      
    </div>
  </el-form>
</template>

<script>
export default {
  name: "form-item-view",
  
  data: function(){
    return {
      label: "the label",
      value: 5,
      options: [
        {id:1, value: "Alignment: left"},
        {id:2, value: "Margin-top is 3px"},
        {id:3, value: "FLoat none"},
        {id:4, value: "border radius 34px"},
        {id:5, value: "rem is a unit"},
        {id:6, value: "css biatches"},
        {id:2000, value: "Lorem ipsum dolor sic transit gloria munid and another thousand words"}

      ],
      selectMessage: "Selecione...",
      error: null,
      required: false,
      labelWidth: null,
      labelPosition: null
    }
  },


  methods: {
    onInput(v){
      console.log("input:", v)
    },

    onUpdate(v){
      console.log("update:", v)
    },

    onChange(v){
      console.log("change:", v)
    }

  }
}
</script>