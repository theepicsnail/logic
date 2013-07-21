define(["Kinetic", "UI", "Resources"], function(K, UI, R){
  var group;
  var onSelectListener = function(e) {
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
  }
  function addGateToToolbox(gate, x, y) {
    //Add the gate to the group
    gate.setPosition(x,y)
    gate.on('mousedown', function(e){
      e.bubbles= false
      e.cancelBubble = true
      if (onSelectListener) 
        onSelectListener(gate.getName())
    })
    group.add(gate)
  }
  return {
    load: load,
    getMainGroup: function(){ return group },
    setOnSelectListener: function(cb){ onSelectListener = cb },
  }
})
