function OneOf(...values){
  if(!values || !values.length) throw "Required: values"
  this.$value = null
  if(values instanceof OneOf) values = values.getInitValues()
  for(var value of values){
    this.addValue(value)
  }
}

function normalizeName(name){
  var v = (name + "")
    .replace(/(_|-)[a-z]/g, function (v) { return v[1].toUpperCase() })
    .replace(/[^A-Za-z0-9]/g, "")
    .replace(/^[a-z]/, function (v) { return v.toUpperCase() })
  if(!v.length) throw "normalizeName - invalid value: " + name
  return v
}

OneOf.prototype.addValue = function(value){
  if(!value) throw "Required: value"
  if(!this.$values) this.$values = []
  if(!this.$keys) this.$keys = {}
  var data = null
  if(value.constructor === String){
    data = {
      key: normalizeName(value),
      value: value,
      init: value
    }
  } else {
    var name = value.id || value.key || value.name
    var val = value.value != null? value.value : (value.data != null? value.data : name)
    data = {
      key: normalizeName(name),
      value: val,
      init: value
    }
  }

  if(this.$keys[data.key]) throw "Duplicate key: " + data.key

  var my = this
  Object.defineProperty(this, "is" + data.key, {
    get: function(){ return my.$value === data.value},
    set: function(v){ my.$value = v? data.value: null}
  })

  this["set" + data.key] = function(v){
    my.$value = (v || v === undefined)? data.value : null
    return this;
  }

  Object.defineProperty(this, "data" + data.key, {
    get: function () { return data.data },
    set: function(v){ data.data = v}
  })

  this.$values.push(value)

}

OneOf.prototype.create = function(){
  return new OneOf(this)
}

OneOf.prototype.getInitValues = function(){
  return this.$values.map(function (item) { return item.init })
}

OneOf.prototype.getKeys = function(){
  return this.$values.map(function (item) { return item.key })
}

OneOf.prototype.getValues = function () {
  return this.$values.map(function (item) { return item.value })
}

OneOf.normalizeName = normalizeName
OneOf.create = function(...values){
  return new OneOf(...values)
}

export default OneOf
