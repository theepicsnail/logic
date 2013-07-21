define(["Gates", "Kinetic", "UI", "Connection"], 
function(Gates,   K,         UI,   C) {
  var layer;
  function onGateAdded(g) {
    console.log("Added", g)
  }
  function addOrDestroyConnection(conn) {
    console.log("Add or destroy:", conn)
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
    var c = new C()
    layer.add(c)
    c.setInPoint(anchor.getAbsolutePosition())
    c.setOutPoint(anchor.getAbsolutePosition())

    var dragAnchor = new K.Circle(UI.DragAnchor)
    dragAnchor.setPosition(anchor.getAbsolutePosition())
    layer.add(dragAnchor)
    dragAnchor.setDraggable(true)
    dragAnchor.startDrag()
    dragAnchor.on('dragmove', function(evt) {
      c.setInPoint(evt)
      layer.draw()
    })
    dragAnchor.on('dragend', function(evt) {
      dragAnchor.destroy()
      c.remove()
      addOrDestroyConnection(c) 
      layer.draw()
    })
    
  }

  return {
    load:load,
    addAndDragGate:addAndDrag,
    getLayer: function(){ return layer},
    setOnGateAdded: function(cb) { onGateAdded = cb },
    setOnAddOrDestroyConnection: function(cb) { addOrDestroyConnection = cb },
  } 
});
