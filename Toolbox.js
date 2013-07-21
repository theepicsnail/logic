define(["Kinetic", "UI", "Resources", "Gates"], 
function(K,         UI,   R,           Gates){
  var group, layer;
  var onGateCreated = function(e) {
    console.log(e)
  }

  function load() {
    group = new K.Group()
    var panel = new K.Rect(UI.Toolbox)
    group.setDraggable(true)
    group.add(panel)
    //Start out on the right for the NOT gate
    var leftCol = false;
    var row = 0 
    for (var i in R.gates) {
      //get x,y and set us up for the next iteration
      var x = 12;
      var y = 12 + 46 * row;
      if (!leftCol) {
        x += 95
        row ++
      }
      leftCol = !leftCol

      var gate = R.newImage(R.gates[i])
      addGateToToolbox(gate, x, y);
    }
    layer = new K.Layer()
    layer.add(group)
  }
  function addGateToToolbox(gate, x, y) {
    //Add the gate to the group
    gate.setPosition(x,y)
    gate.on('mousedown', function(e){
      e.bubbles= false
      e.cancelBubble = true
      
      if (onGateCreated) {
        g = Gates.newGate(gate.getName())
        g.setPosition(gate.getAbsolutePosition())
        onGateCreated(g)
      }
    })
    group.add(gate)
  }
  return {
    load: load,
    getLayer: function(){ return layer },
    setOnGateCreatedCallback: function(cb){ onGateCreated = cb },
  }
})
