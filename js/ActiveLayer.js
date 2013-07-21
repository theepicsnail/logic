define(["Gates", "Kinetic", "UI"], 
function(Gates,   K,         UI) {
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
    gate.setOnAnchorConnectionStart(anchorStart)
    gate.on('dragend', function(evt) {
      gate.remove()    
      onGateAdded(gate)
      layer.draw()
    })
  }

  function anchorStart(anchor) {
    console.log("Anchor start", anchor)
    var pts = [anchor.getAbsolutePosition(), anchor.getAbsolutePosition()]
    var line = new K.Line({
      points:pts,
      stroke:'black', strokeWidth:3
    })
    layer.add(line)

    var dragAnchor = new K.Circle(UI.DragAnchor)
    dragAnchor.setPosition(anchor.getAbsolutePosition())
    layer.add(dragAnchor)
    dragAnchor.setDraggable(true)
    dragAnchor.startDrag()
    dragAnchor.on('dragmove', function(evt) {
      pts[1] = evt
      line.setPoints(pts)
      layer.draw()
      LINE= line
    })
    dragAnchor.on('dragend', function(evt) {
      dragAnchor.destroy()
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
