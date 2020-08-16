import Vue from 'vue'
import VueRouter from 'vue-router'

import HelloWorld from "../components/hello-world.vue"
import RenderV1 from "../components/render-v1.vue"
import PageListEditor from "../views/page-list-editor-view.vue"
import TablePagination from "../views/table-pagination-view.vue"
import FormItem from "../views/form-item-view.vue"
import EditorInput from "../views/editor-input-view.vue"
import ImageSelector from "../views/image-selector-view.vue"
import Main from "../views/main.vue"

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {path:"/", component:Main},
    {path:"/hello", component:HelloWorld},
    {path:"/render-v1", component: RenderV1},
    {path:"/editor-v1", component:PageListEditor},
    {path:"/pagination", component: TablePagination},
    {path:"/form-item", component: FormItem},
    {path:"/editor-input", component: EditorInput},
    {path:"/image-selector", component: ImageSelector}
  ]
})