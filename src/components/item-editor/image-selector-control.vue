<template>
  <div class="image-selector-control">
    <div class="p-grid p-dir-col" style="width:100%; height:100%">

      <div class="p-col-fixed">
        <selection-input 
          :value="group" 
          :options="groups" 
          select-message="Selecione..."
          label-key="descricao"
          @update="onSelectGroup"
          v-slot="{option}">
          {{option.descricao}} : {{option.imagens.length}} {{option.imagens.length > 1? "imagens": "imagem"}}
        </selection-input>
      </div>
      <div class="p-col-fixed">
        <el-button circle :type="buttonType(mode.isList)" @click="mode.setList" title="Exibir lista">
          <i class="fas fa-list"></i>
        </el-button>

        <el-button circle :type="buttonType(mode.isSwatches)" @click="mode.setSwatches" title="Exibir ícones grandes">
          <i class="fas fa-th"></i>
        </el-button>

        <el-button circle :type="buttonType(mode.isCarousel)" @click="mode.setCarousel" title="Exibir imagens">
          <i class="fas fa-image"></i>
        </el-button>
      </div>

      <div class="p-col image-selector-images" :class="imageListClass" style="position:relative">
        <div v-if="mode.isList"  class="image-selector-list image-selector-container">
          <div tabindex="0" 
            v-for="img in images" 
            :key="img.id" 
            :class="{'active': img === image}"
            class="p-grid p-nogutter p-align-center image-selector-list-image"
            @click="onSelectImage(img, $event)"
            @focus="onSelectImage(img, $event)">
            <img :src="img.src || noImgSrc" class="p-col-1" />
            <span class="p-col p-pl-1">
              {{img.descricao}}
            </span>
          </div>
        </div>

        <div v-if="mode.isSwatches" class="image-selector-swatches image-selector-container p-grid p-m-0 p-align-start">
          <div tabindex="0" 
            v-for="img in images" 
            :key="img.id" 
            :class="{'active': img === image}"
            class="p-col-3 image-selector-swatches-image"
            @click="onSelectImage(img, $event)"
            @focus="onSelectImage(img, $event)">
            <div class="image-selector-swatches-image--container">
              <div class="image-selector-swatches-image--content">
                <div class="image-selector-swatches-image--image">
                  <img :src="img.src || noImgSrc" />
                </div>
                <div class="image-selector-swatches-image--label">
                  {{img.descricao}}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="mode.isCarousel" class="image-selector-accordion"  style="width:100%; height:100%;">
          this is the accordion control
        </div>
      </div>
    </div>

  </div>
</template>

<style>
  .image-selector-images {
    border:1px solid #ccc;
    border-radius: 0.5rem;
  }

  .image-selector-container {
    position:absolute;
    padding:0;
    background-color: transparent;
    left:4px;
    top:4px;
    right:4px;
    bottom:4px;
    overflow:auto;
  }

  .image-selector-list-image {
    cursor: pointer;
    padding:0.5rem;
    margin: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }

  .image-selector-list-image:focus,
  .image-selector-swatches-image:focus .image-selector-swatches-image--container {
    border: 1px solid #aaa;
  }

  .image-selector-list-image.active,
  .image-selector-swatches-image.active .image-selector-swatches-image--container {
    background-color: hsl(220, 100%, 90%);
  }

  .image-selector-swatches-image {
    cursor: pointer;
    padding:0.5rem;
  }

  .image-selector-swatches-image--container {
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    padding: 0;
    width:100%;
    padding-top: 100%;
    position:relative;
  }

  .image-selector-swatches-image--content {
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    padding:0.5rem;
    display:flex;
    flex-direction:column;
    justify-content: flex-start;
    align-items: stretch;
  }

  .image-selector-swatches-image--image {
    flex: 4 1;
  }

  .image-selector-swatches-image--label {
    flex: 1 0;
    height: 4rem;
  }

</style>

<script>
  import Vue from 'vue';
  import "./selection-input";
  import OneOf from "../../classes/one-of.js"
  import svg from "../../classes/svg-question.js"


  export default Vue.component("image-selector-control", {
    props: {
      groups: Array,
      group: Object,
      images: Array,
      image: Object
    },

    data: function(){ 
      return {
        mode: OneOf.create("list", "swatches", "carousel").setList()
      }
    },

    computed:{
      buttonType: function(){
        return function(v){
          return v? "primary": null
        }
      },

      noImgSrc: function(){
        return "data:image/svg+xml;utf-8," + svg.img;
      },

      imageListClass: function(){
        var m = this.mode
        return m.isList? "is-list" :(m.isSwatches? "is-swatches": (m.isCarousel? "is-carousel": null))
      }

    },

    methods: {
      onSelectGroup: function(v){
        //console.log("onSelectGroup", v)
        this.$emit("update:group", v)
      },

      onSelectImage: function(img){
        this.$emit("update:image", img.id)
      }

    }
  })
</script>