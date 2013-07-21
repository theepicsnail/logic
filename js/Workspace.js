define(["Kinetic"], function(K) {
  var layer 
  function load() {
    layer = new K.Layer()
  }

  function addGate(gate) {
    layer.add(gate)
    layer.draw()
  }


  return {
    load: load, 
    getLayer: function() {return layer}, 
    addGate: addGate,
  }
});
