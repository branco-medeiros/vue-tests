<template>
  <div>
    <ul>
      <li>
        <editor-test name="checkbox-input" :props="checkbox" ref="checkbox" @save="onSave">
          <div class="p-mb-2">
            <el-switch v-model="checkbox.lineBreaks"></el-switch>
            Line breaks
          </div>
        </editor-test>
      </li>

      <li>
        <editor-test name="checkbutton-input" :props = "checkbutton" @save="onSave" />
      </li>

      <li>
        <editor-test name= "text-input" :props="text" @save="onSave" />
      </li>

      <li>
        <editor-test name= "textarea-input" :props = "textarea" @save="onSave" />
      </li>

      <li>
        <editor-test name = "selection-input" :props = "selection" @save="onSave" />
      </li>

      <li> 
        <editor-test name = "option-input" :props = "option" ref = "option" @save="onSave" >
          <div class="p-mb-2">
            <el-switch v-model="option.lineBreaks"></el-switch>
            Line breaks
          </div>
        </editor-test>
      </li>

      <li>
        <editor-test name = "optionbutton-input" :props = "optionbutton" ref = "optionbutton" @save="onSave" />
      </li>

      <li>
        <editor-test name="masked-input" :props = "masked" ref="masked" @save="onSave" />
      </li>

      <li>
        <editor-test name="image-input" :props="image" ref="image" @save="onSave" />
      </li>

    </ul>
    <el-dialog :visible.sync="showResult" title = "Save results">
      {{resultValue}}
    </el-dialog>

  </div>
</template>

<script>
import "../components/item-editor/checkbox-input.vue"
import "../components/item-editor/checkbutton-input.vue"
import "../components/item-editor/text-input.vue"
import "../components/item-editor/textarea-input.vue"
import "../components/item-editor/selection-input.vue"
import "../components/item-editor/option-input.vue"
import "../components/item-editor/optionbutton-input.vue"
import "../components/item-editor/masked-input.vue"
import "../components/item-editor/image-input.vue"
import "../components/editor-test.vue"

export default {
  name:"editor-input-view",
  data: function(){
    return {
      resultValue: null,
      showResult: false,

      checkbox: {
        lineBreaks: false,
        options: [
          {id:1, label: "Batman"},
          {id:2, label: "Superman"},
          {id:3, label: "Major Fatal"},
          {id:4, label: "The Spirit"},
          {id:5, label: "King Arthur"}
        ],
        value: [{id:1}, {id:2}],
      },

      checkbutton: {
        options: [
          {key: "a", text: "Entering the System"},
          {key: "b", text: "With the Big-Bang"},
          {key: "c", text: "The Piramids!"},
          {key: "d", text: "it start to break"},
          {key: "e", text: "all of the above"}
        ],
        value: [{key:"e"}, {key: "b"}],
        idKey: "key",
        labelKey: "text" 
      },

      text: {
        value: "initial text value",
      },

      textarea: {
        value: "initial textarea value",
      },

      selection:{
        options: [
          {id:1, label: "PHP -- the bad, bad, boy"},
          {id:2, label: "Visual Basic -- Gooffy is a nice guy"},
          {id:3, label: "C -- pedal to the metal"},
          {id:4, label: "C++ -- who needs simplicity anyway?"},
          {id:5, label: "Python -- it doesn't byte"},
          {id:6, label: "Perl -- jam"}
        ],
        value: {id:5},
        message: "Pick one...",
      },

      option: {
        options: [
          {id:1, label: "Itza bing"},
          {id:2, label: "Itza bong"},
          {id:3, label: "Itza bang"},
          {id:4, label: "Itza no"},
          {id:5, label: "Itza yes"},
        ],
        value: {id:5},
        lineBreaks: false,
      },

      optionbutton: {
        options: [
          {id:1, label: "Pata"},
          {id:2, label: "Peta"},
          {id:3, label: "Pita"},
          {id:4, label: "Pota"},
          {id:5, label: "Raimundinha"},
        ],
        value: {id:2},
      },

      masked: {
        mask: "\\(99\\) 9999[9]-9999",
        value: null
      },

      image: {
        value: {idImagem: 1075, url: "http://www.tjpa.jus.br/CMSPortal/VisualizarImagem?idImagem=1075", mimeType: "image/jpg"}
      }
    }
  },

  methods: {
    onSave: function(v){
      this.resultValue = v;
      this.showResult = true
    }
  }

}
</script>