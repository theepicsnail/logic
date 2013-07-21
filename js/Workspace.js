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
    var pt = conn.getInPoint()
    var x = pt[0]
    var y = pt[1]    
    var connectTo = undefined
    layer.get(".in").each(function(f) {
      var pt2 = f.getAbsolutePosition()
      var dx = pt2.x-x
      var dy = pt2.y-y
      if(dx*dx+dy*dy <= 49){
        connectTo = f
      }
    })

    if (connectTo == undefined) {
      conn.destroy()
      return
    }

    pt = conn.getOutPoint()
    x = pt[0]
    y = pt[1]
    var connectFrom = undefined
    layer.get(".out").each(function(f) {
      var pt2 = f.getAbsolutePosition()
      var dx = pt2.x-x
      var dy = pt2.y-y
      if(dx*dx+dy*dy <= 49){
        connectFrom = f
      }
    })
    if (connectFrom == undefined) {
      conn.destroy()
      return 
    }

    conn.setOutAnchor(connectFrom)
    conn.setToAnchor(connectTo)
    layer.add(conn) 
    layer.draw()
  }

  return {
    load: load, 
    getLayer: function() {return layer}, 
    addGate: addGate,
    addOrDestroyConnection: addOrDestroyConnection
  }
});
