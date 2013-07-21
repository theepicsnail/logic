define(["Kinetic"], function(Kinetic) {
  var stage = new Kinetic.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight
  })
  
  window.onresize = function(e) {
    stage.setSize(window.innerWidth,
                  window.innerHeight)
  }

  return stage
});
