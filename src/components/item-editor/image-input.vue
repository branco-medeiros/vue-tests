<template>
  <div class="image-input" style="border:1px solid #ccc; border-radius:8px; padding:0.5em;">
    <div class="image-input-placeholder p-grid p-justify-center p-align-center">
      <img :src="imageData || noImage" class="p-col-fixed" style="max-width:100%; max-height:100%" :title="url || noImageMsg" />
    </div>
    <div class="p-grid">
      <input type="file" ref="file" style="visibility:hidden; width: 1em;" @change="onFileOpen" />
      <el-dropdown class="p-col-fixed" @command="onCommand" trigger="click">
        <el-button type="primary" :loading="loading">
          {{imageText || 'Selecione...' }}
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item 
            v-for="option in commands" 
            :key="option.id" 
            :icon = "iconFor(option)" 
            :command="option.id">
            {{option.text}}...
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="p-col-fixed" v-if="mode != null">
        <el-button circle type="" icon="el-icon-delete" @click="onDelete"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseMixin from "./base-mixin.js"
  import Vue from "vue"
  //import $ from "jquery"

  const MODE_URL = "url"
  const MODE_FILE = "file"
  const MODE_BANCO = "banco"

  export default Vue.component("image-input", {
    mixins: [BaseMixin],

    data: function(){
      return {
        loading: false
      }

    },

    computed: {
      noImageMsg: function(){
        return "<nenhuma imagem selecionada>"
      },

      noImage: function(){
        return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" ' +
          'viewBox="0 0 48 48"><path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 ' +
          '24 4zm2 34h-4v-4h4v4zm4.13-15.49l-1.79 1.84C26.9 25.79 26 27 26 30h-4v-1c0-2.21.9-4.21 ' + 
          '2.34-5.66l2.49-2.52C27.55 20.1 28 19.1 28 18c0-2.21-1.79-4-4-4s-4 1.79-4 4h-4c0-4.42 3.58-8 ' +
          '8-8s8 3.58 8 8c0 1.76-.71 3.35-1.87 4.51z"/></svg>'
      },

      iconFor: function(){
        var my = this
        return function(option){
          return option.id === my.mode? "el-icon-success": null
        }
      },

      commands: function(){
        return [
          {id: MODE_FILE, text:"Arquivo"},
          {id: MODE_URL, text:"Imagem da web"},
          {id: MODE_BANCO, text: "Banco de imagens"}
        ]
      },

      idImagem: {
        get: function(){ return this.result.idImagem},
        set: function(v) {this.result.idImagem = v}
      },

      fileName: {
        get: function(){ return this.result.fileName},
        set: function(v) {this.result.fileName = v}
      },

      url: {
        get: function(){ return this.result.url},
        set: function(v){ this.result.url = v}
      },

      mimeType: {
        get: function(){ return this.result.mimeType},
        set: function(v) { this.result.mimeType = v}
      },

      imageData: {
        get: function(){ return this.result.imageData},
        set: function(v){ this.result.imageData = v}
      },

      mode: function(){
        return this.idImagem
          ? MODE_BANCO
          :(this.fileName
            ? MODE_FILE
            : (this.url
              ? MODE_URL
              : null
            )
          )
      },

      imageText: function(){
        return this.isUrl
          ? this.url 
          : (this.isBanco
            ? "Imagem #" + this.idImagem
            : (this.isFile
              ? "Arquivo: " + this.fileName
              : null
            )
          )
      },

      hasImage: function(){
        return this.mode != null
      },

      isUrl: function(){
        return this.mode === MODE_URL
      },

      isBanco: function(){
        return this.mode === MODE_BANCO

      },

      isFile: function(){
        return this.mode === MODE_FILE
      }
    },

    methods: {
      onFileOpen: function(){
        var file = this.$refs.file.files[0]
        if(file){
          //console.log("file", file)
          this.setFileImage(file.name, file.type)
          this.loading = true
          this.fileReader.readAsDataURL(file)
        }
      },

      onCommand: function(cmd){
        //console.log("command", cmd)
        var my = this
        if(cmd === MODE_FILE){
          this.$refs.file.click()

        } else if(cmd === MODE_URL){
          this.$prompt("Entre o endereço da imagem", "Imagem da Web", {
            inputValue: this.isUrl? this.url: null,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancelar'
          })
          .then(function(url){
            console.log("prompt", url)
            url = url.value
            my.loading = true
            var xhr = new XMLHttpRequest();
            xhr.onload = function(){
              console.log("onload", xhr)
              my.idImagem = null
              my.url = url
              my.mimeType = xhr.type
              my.fileName = null
              my.fileReader.readAsDataURL(xhr.response)              
            };  
            xhr.onerror = function(){
              console.log("onerror", xhr)
              my.loading = false
              my.$notify.error({
                title: 'Erro',
                message: 'Não foi possível utilizar a imagem especificada'
              });
            }          

            xhr.open('get', url);
            xhr.responseType = 'blob';
            xhr.send()

          })
          .catch(function(){
            //does nothing
          })

        } else if(cmd === MODE_BANCO){

          //console.log("show banco dialog")

        }

      },

      onCommandClick: function(cmd){
        console.log("onCommandClick", cmd)
        if(cmd === "file"){
          this.$refs.file.$el.click()
        }
      },

      onDelete: function(){
        this.idImagem = null
        this.fileName = null
        this.url = null
        this.mimeType = null
        this.imageData = null
      },

      setFileImage: function(fileName, mime){
          this.fileName = fileName
          this.mimeType = fileType
          this.url = null
          this.idImagem = null

      },

      mapValue: function(v){
        v = v || {}
        return {
          idImagem: v.idImagem, 
          fileName: v.fileName, 
          url: v.url, 
          mimeType: v.mimeType, 
          imageData: v.imageData
        }
      },

      import: function(v){
        return this.mapValue(v)
      },

      export: function(v){
        return this.mapValue(v)
      },

      changed: function(){
        var v1 = this.value || {}
        var v2 = this.result || {}
        return (["idImagem", "fileName", "url", "mimeType", "imageData"].find(function(k){
          return v1[k] !== v2[k]
        })) != null
      }
    },

    created: function(){
      var my = this
      var fr = new FileReader()
      fr.addEventListener("load", function(){
        my.imageData = fr.result
        my.loading = false
      })

      fr.addEventListener("error", function(...args){
        console.log("error", args)
      })
      this.fileReader = fr
    }

  })
</script>