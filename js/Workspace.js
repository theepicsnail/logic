define(["Kinetic"], function(K) {
  var layer 
  function load() {
    layer = new K.Layer()
  }

  function addGate(gate) {
    layer.add(gate)
    layer.draw()
  }

  function addOrDestroyConnection(conn) {
    console.log(conn)
  }

  return {
    load: load, 
    getLayer: function() {return layer}, 
    addGate: addGate,
    addOrDestroyConnection: addOrDestroyConnection
  }
});
