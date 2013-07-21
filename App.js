define(["Kinetic", "Resources", "Stage", "UI"],
function(K, R, S, UI){

  var toolbox;

  /*
    Build the tool box, with all the images/objects/etc...
    Putting them in the scene happens later.
  */
  function load() {    
    toolbox = new K.Group()
    toolbox.add( new K.Rect(UI.Toolbox))
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

      //Add the gate to the group
      var gate = R.newImage(R.gates[i])
      gate.setPosition(x,y)
      toolbox.add(gate)
    }
  }

  function start() {
    var layer = new K.Layer()
    layer.add(toolbox)
    S.add(layer)
  }


  return {
    load: load,
    start:start
  }
})
