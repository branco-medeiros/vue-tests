<template>
  <image-selector-control 
    ref="images"
    :groups = "bancoImagens" 
    :images = "imagensPorGrupo"
    :group = "group"
    :image = "image"
    @update:group = "onGroup"
    @update:image = "onImage"
    style="height:100%">
  </image-selector-control>
</template>

<style>
  .image-selector-control {
    padding: 0.5rem;
  }

  .image-selector-control .image-selector-images.is-list {
    background-color: hsl(180, 100%, 97%);
  }

  .image-selector-control .image-selector-images.is-swatches {
    background-color:hsl(300, 100%, 97%);
  }

  .image-selector-control .image-selector-images.is-accordion {
    background-color:hsl(120, 100%, 97%);
  }



</style>

<script>
import "../components/item-editor/image-selector-control.vue";
import svg from "../classes/svg-image.js"

export default {
  name: "image-selector-view",
  
  data: function(){
    return {
      image: null,
      group: null,
    }
  },

  computed: {
    db: function(){
      const NUM_BANCOS = 20;
      const MAX_BANCO_IMAGES = 15;
      const HSL_STEP = Math.floor(360 / 20)
      const HSL_MIN = 20;
      const HSL_MAX = 90;
      var bancos = []
      var bndict = {}
      var imgdict = {}

      var imgid = 0;
      var h = 0;
      for(var i = 1; i <= NUM_BANCOS; ++i){
        var imagens = []
        var banco = {
          id:i, 
          descricao: "Banco de Imagens #" + i, 
          imagens: imagens
        }

        var numImagens = Math.ceil(Math.random() * MAX_BANCO_IMAGES) + 1;
        
        var l = HSL_MIN;
        var lstep = (HSL_MAX - HSL_MIN) / numImagens;
        for(var j = 1; j <= numImagens; ++j){
          imgid += 1
          var image = {
            id:imgid, 
            descricao: "Imagem #" + imgid, 
            bancoImagem: banco, 
            src: "data:image/svg+xml;utf-8, " + svg.hsl(h, 100, l)
          }
          imagens.push(image)
          imgdict[image.id.toString()] = image
          l += lstep;
        }
        
        banco.label = banco.descricao + " - " + imagens.length + (imagens.length === 1? "Imagem": " imagens")

        h += HSL_STEP;
        bancos.push(banco)
        bndict[banco.id.toString()] = banco
      }
      return {
        bancos: bancos,
        bancoById: bndict,
        imageById: imgdict
      };
    },

    bancoImagens: function(){
      return this.db.bancos
    },
    
    imagensPorGrupo: function(){
      return this.group? this.group.imagens: null
    },

  },

  methods: {
    onGroup: function(v){
      console.log("onGroup", v)
      var group = v? this.db.bancoById["" + v] : null
      if(group !== this.group) this.image = null
      this.group = group
    },

    onImage: function(v){
      var image = v? this.db.imageById["" + v] : null
      this.image = image
    },

    getImage: function(){
      return this.$refs.image
    }


  }


}
</script>

