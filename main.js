var stage;
var layer;
var loadingAnim;
var loadingText;
var gateImage;
window.onload = function () {

  stage = new Kinetic.Stage({
    container: 'container',
    width: window.innerWidth,
    height:window.innerHeight
  });

  layer = new Kinetic.Layer();
  stage.add(layer);
  window.onresize = function(e) {
    stage.setSize(window.innerWidth, window.innerHeight)
  }

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
    loadingText.setPosition(stage.getWidth()/2 - 60, stage.getHeight()/2)
  }, layer);

  loadingAnim.start();
  layer.add(loadingText);

  gateImage = new Image();
  gateImage.onload = loadFinished
  gateImage.src = "images/gates.png"
}

function loadFinished() {
  loadingAnim.stop()
  loadingText.remove()

  var crops = {}
  var y = 0
  crops["NOT"] ={x:0, y:y, width:162, height:64}; y += 64; 
  crops["AND"] ={x:0, y:y, width:162, height:64}; y += 64; 
  crops["NAND"]={x:0, y:y, width:162, height:64}; y += 64; 
  crops["OR"]  ={x:0, y:y, width:162, height:64}; y += 64; 
  crops["NOR"] ={x:0, y:y, width:162, height:64}; y += 64; 
  crops["XOR"] ={x:0, y:y, width:162, height:64}; y += 64; 
  crops["XNOR"]={x:0, y:y, width:162, height:64}; y += 64; 
  var gateImages = {};

  var b = new Kinetic.Bezier({
    startPoint:{x:0,y:0},
    controlPoint1:{x:50,y:0},
    controlPoint2:{x:50,y:100},
    endPoint:{x:100,y:100}
  })
  layer.add(b)



  var gate = new Kinetic.Image({crop:crops["NOT"], image:gateImage, width: 162, height:64, draggable:true, scale:.5});
  layer.add(gate)
  gate.setPosition(100,100)

  var gate2 = new Kinetic.Image({crop:crops["OR"], image:gateImage, width: 162, height:64, draggable:true, scale:.5});
  layer.add(gate2)
  gate2.setPosition(50,50)


  gate.on('dragmove', function(m) {
    target = m.targetNode.attrs
    b.startPoint.x = target.x + target.width * target.scaleX
    b.startPoint.y = target.y + target.height/2* target.scaleY
    b.controlPoint1.x = b.startPoint.x + 100
    b.controlPoint1.y = b.startPoint.y
  })

  gate2.on('dragmove', function(m) {
    target = m.targetNode.attrs
    b.endPoint.x = target.x
    b.endPoint.y = target.y + (target.height/2 - 15)* target.scaleY
    b.controlPoint2.x = b.endPoint.x - 100
    b.controlPoint2.y = b.endPoint.y 
  })


  var rect;
  rect = new Kinetic.Rect({
    x: 239,
    y: 75,
    width: 100,
    height: 50,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4
  });

  layer.add(rect);
  layer.draw()


  /*
  var i = new Kinetic.Image({image:imageObj, x:0, y:0})
  layer.add(i)
  /**/
  layer.add(rect);

  // add the layer to the stage

  layer.draw()
}

