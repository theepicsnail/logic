var stage, gateImages={};
window.onload = function () {

  stage = new Kinetic.Stage({
    container: 'container',
    width: window.innerWidth,
    height:window.innerHeight
  });

  var layer;
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

  var gateImage = new Image();
  gateImage.onload = function () {

    parseImages(gateImage)
    buildToolbox()

    loadingAnim.stop()
    layer.remove()
  }
  gateImage.src = "images/gates.png"
}

function parseImages(gateImage) {
  var configs = {}
  var y = 0
  configs["NOT"] ={x:0, y:y, width:162, height:64}; y += 64; 
  configs["AND"] ={x:0, y:y, width:162, height:64}; y += 64; 
  configs["NAND"]={x:0, y:y, width:162, height:64}; y += 64; 
  configs["OR"]  ={x:0, y:y, width:162, height:64}; y += 64; 
  configs["NOR"] ={x:0, y:y, width:162, height:64}; y += 64; 
  configs["XOR"] ={x:0, y:y, width:162, height:64}; y += 64; 
  configs["XNOR"]={x:0, y:y, width:162, height:64}; y += 64; 
  gateImages = {}
  for (var gate in configs) {
    gateImages[gate] = new Kinetic.Image({
      crop:configs[gate],
      width: 162, height:64, scale:.5,
      image:gateImage
    })
  }
}

function buildToolbox() {

  toolbox = new Kinetic.Layer()
  var rect;
  rect = new Kinetic.Rect({
    x: 2,
    y: 2,
    width: 200,
    height: 500,
    fill: '#9d9',
    stroke: 'black',
    strokeWidth: 4
  });
  toolbox.add(rect)

  var orderedGates = ["AND",  "NAND", 
                      "OR",   "NOR",
                      "XOR",  "XNOR",
                      "NOT"]
  var leftCol = true;
  var row = 0;
  for (var id in orderedGates) {
    var gate = orderedGates[id]

    var y = 6 + row * 70
    var x = 9
    if (!leftCol) {
      x += 90
      row += 1
    }
    leftCol = !leftCol;
   
    (function (x,y, gate) { 
    var img = gateImages[gate]
    img.setPosition(x,y)
    toolbox.add(img)
    img.on('mousedown', function() {
      g = newGate(gate)
      g.setPosition(x,y)
      workspace.add(g)
      console.log(g)
      stage.draw()

      g.startDrag()
    })
    })(x,y,gate)
  }

  stage.add(toolbox)

  var workspace = new Kinetic.Layer()
  stage.add(workspace)
}

function newGate(gateType) {
  var group = new Kinetic.Group({
      draggable:true})
  var src = gateImages[gateType]
  //return src
  var gate = new Kinetic.Image({
      x:src.getX(),
      y:src.getY(),
      width:src.getWidth(),
      height:src.getHeight(),
      crop:src.getCrop(),
      image:src.getImage(),
      scale:src.getScale(),
  })
  gate.setPosition(0,0) 
  gate.on('dragend', function(e){
    if (e.x < 200)
    {
      var l = gate.getLayer()
      gate.remove()
      l.draw()
    }
  })
  group.add(gate)

  var out = newOutput()
  out.setPosition(76,16)
  group.add(out)


  var in1 = newInput()
  group.add(in1)
  if (gateType == "NOT") {
    in1.setPositon(4,17)
  } else {
    in1.setPosition(4,10)

    var in2 = newInput()
    in2.setPosition(4, 25)
    group.add(in2)
  }

  return group
}

function newInput() {
  var obj = new Kinetic.Circle({
    radius:5, fill:'#DDD', strokeWidth:2, stroke:'black'
  })
  return obj
}

function newOutput() {
  var obj = new Kinetic.Circle({
    radius:5, fill:'#DDD', strokeWidth:2, stroke:'black'
  })
  return obj
}












function unused() {
  var b = new Kinetic.Bezier({
    startPoint:{x:0,y:0},
    controlPoint1:{x:50,y:0},
    controlPoint2:{x:50,y:100},
    endPoint:{x:100,y:100}
  })
  layer.add(b)



  var gate = new Kinetic.Image({crop:configs["NOT"], 
        width: 162, height:64, draggable:true, scale:.5});
  layer.add(gate)
  gate.setPosition(100,100)

  var gate2 = new Kinetic.Image({crop:configs["OR"], 
        width: 162, height:64, draggable:true, scale:.5});
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
  stage.draw()
}

