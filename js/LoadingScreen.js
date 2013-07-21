define(["Stage", "Kinetic"], function (Stage, K) {
  var layer = new K.Layer()
  var loadingText;
  var loadingAnim; 
  
  function startLoading() {
  
    loadingText = new Kinetic.Text({
      x:0,
      y:20,
      text:"Loading", 
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'black'
    });

    loadingAnim = new Kinetic.Animation(function(frame) {
      loadingText.setOpacity(.7 + .3 * Math.sin(frame.time * .005))
      loadingText.setPosition(
        Stage.getWidth()/2 - 60, 
        Stage.getHeight()/2 - 23)
    }, layer);

    loadingAnim.start();
    layer.add(loadingText);

    Stage.add(layer)
    
  }

  function stopLoading() {
    loadingAnim.stop();
    layer.destroy()
  }

  return {
    start: startLoading,
    stop: stopLoading
  }
});
