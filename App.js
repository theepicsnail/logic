define(["Kinetic", "Stage", "Toolbox"],
function(K, S, T){

  function load() {
    T.load()
  }

  function start() {
    var layer = new K.Layer()
    layer.add(T.getMainGroup())
    S.add(layer)
  }


  return {
    load: load,
    start:start
  }
})
