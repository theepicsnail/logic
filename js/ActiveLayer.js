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
  function addAndDrag(gate) {
    layer.add(gate)
    gate.setDraggable(true)
    gate.startDrag()
    gate.on('dragend', function(evt) {
      gate.remove()    
      onGateAdded(gate)
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
