define(["Gates", "Kinetic"], 
function(Gates,   K) {
  var layer;
  function onGateAdded(g) {
    console.log("Added", g)
  }

  function load() {
    layer = new K.Layer()
    layer.setOpacity(.7)
  }
  function addAndDrag(gateType) {
    layer.add(g)
    g.setDraggable(true)
    g.startDrag()
    g.on('dragend', function(evt) {
      g.remove()    
      onGateAdded(g)
      layer.draw()
    })
  }

  return {
    load:load,
    addAndDragGate:addAndDrag,
    getLayer: function(){ return layer},
    setOnGateAdded: function(cb) { onGateAdded = cb } 
  } 
});
