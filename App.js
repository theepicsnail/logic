define(["Kinetic", "Resources", "Stage"],
function(K, R, S){

  function start() {
    var layer = new K.Layer()
    layer.add(R.newImage('NOT'))
    S.add(layer)
  }


  return {
    start:start
  }
})
