<script>
export default {
  name:"render-v1",
  data: function(){
    return {
      clickCount: 0
    }
  },
  computed: {
    backgroundColor: function(){
      var count = this.clickCount % 10
      return count < 2? "green" : (count < 5? "orange": "red")
    }
  },

  methods:{
    onClick: function(){
      this.clickCount += 1
    }
  },
  render: function(h){
    const title = h("h1", "Render V1")
    const button = h("el-button", {on:{click:this.onClick}, props:{type:"primary"}}, "Click me")

    const coloredText = h("span", {style:{color: this.backgroundColor}}, "Number of clicks:")
    const span = h("span", ["<<", coloredText, this.clickCount, ">>"])
    
    const grid = h("div", {'class':"p-grid p-align-center"}, [
      h("div", {'class':"p-col", style:{textAlign:"right"}}, [span]),
      h("div", {'class':"p-col", style:{textAlign:"left"}}, [button])
    ])

    return h("div", [title, grid]) 
  }
}
</script>