export default function(svg){
  var ret = {
    img:svg, 
    hsl(h, s, l, opacity) {
      var hsl = `hsl(${Math.floor(h)}, ${Math.floor(s)}%, ${Math.floor(l)}%)`
      var op = `${Math.floor(opacity || 100)}%`
      var color = `<path fill="${hsl}" fill-opacity="${op}" `;
      return ret.img.replace("<path ", color)
    }
  }

  return ret;
}