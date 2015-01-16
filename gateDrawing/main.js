/*global Kinetic*/
//"use strict";
var SCALE = 15;
var OFFSET = [SCALE*3, SCALE*2]
var FILL = '#EEE';
var HIGH = '#F88';
var LOW = '#777';
var STROKE = '#000';
var STROKE_WIDTH = SCALE / 5;
function BULB(state) {
  return new Kinetic.Shape({
    drawFunc: function (canvas) {
      var context = canvas.getContext();
      context.beginPath();
      context.arc(SCALE * 5, SCALE * 2, SCALE * 2, 0, Math.PI * 7 / 6, true);
      context.lineTo(SCALE, SCALE);
      context.lineTo(SCALE, SCALE * 3);
      context.arc(SCALE * 5, SCALE * 2, SCALE * 2, Math.PI * 5 / 6, 0, true);
      context.moveTo(SCALE * 1.7, SCALE * 1.2);
      context.lineTo(SCALE * 2.3, SCALE * 2.8);
      context.moveTo(SCALE * 2.7, SCALE * 1.2);
      context.lineTo(SCALE * 3.3, SCALE * 2.8);
      context.moveTo(0, SCALE * 2);
      context.lineTo(SCALE, SCALE * 2);
      canvas.fillStroke(this);
      context.beginPath();
      context.arc(SCALE * 5, SCALE * 2, SCALE * 1.25, 0, Math.PI * 2, true);
      this.setFill(state ? HIGH : LOW);
      canvas.fillStroke(this);
      this.setFill(FILL);
    },
    fill: FILL,
    stroke: STROKE,
    offset: OFFSET,
    width: SCALE*8, height: SCALE*4,
    strokeWidth: STROKE_WIDTH,
  });
}

function SEGMENT(val) {
  function hasSegment(segNo) {
  // 000
  //5   1
  //5   1
  //5   1
  // 666
  //4   2
  //4   2
  //4   2
  // 333
    return [
      [1,  1,  1,  1,  1,  1,  0],
      [0,  1,  1,  0,  0,  0,  0],
      [1,  1,  0,  1,  1,  0,  1],
      [1,  1,  1,  1,  0,  0,  1],
      [0,  1,  1,  0,  0,  1,  1],
      [1,  0,  1,  1,  0,  1,  1],
      [1,  0,  1,  1,  1,  1,  1],
      [1,  1,  1,  0,  0,  0,  0],
      [1,  1,  1,  1,  1,  1,  1],
      [1,  1,  1,  1,  0,  1,  1],
      [1,  1,  1,  0,  1,  1,  1],
      [0,  0,  1,  1,  1,  1,  1],
      [1,  0,  0,  1,  1,  1,  0],
      [0,  1,  1,  1,  1,  0,  1],
      [1,  0,  0,  1,  1,  1,  1],
      [1,  0,  0,  0,  1,  1,  1],
    ][val][segNo] === 1;
  }

  return new Kinetic.Shape({
    drawFunc: function (canvas) {
      var context = canvas.getContext();
      context.beginPath();
      context.rect(SCALE * 2, 0, SCALE * 4, SCALE * 4);
      canvas.fillStroke(this);
      context.moveTo(0, SCALE * 0.5);
      context.lineTo(2 * SCALE, 0.5 * SCALE);
      context.moveTo(0, SCALE * 1.5);
      context.lineTo(2 * SCALE, 1.5 * SCALE);
      context.moveTo(0, SCALE * 2.5);
      context.lineTo(2 * SCALE, 2.5 * SCALE);
      context.moveTo(0, SCALE * 3.5);
      context.lineTo(2 * SCALE, 3.5 * SCALE);
      canvas.stroke(this);
      if (hasSegment(0)) { context.moveTo(3.5 * SCALE, 1 * SCALE); context.lineTo(4.5 * SCALE, 1 * SCALE); }
      if (hasSegment(1)) { context.moveTo(4.5 * SCALE, 1 * SCALE); context.lineTo(4.5 * SCALE, 2 * SCALE); }
      if (hasSegment(2)) { context.moveTo(4.5 * SCALE, 2 * SCALE); context.lineTo(4.5 * SCALE, 3 * SCALE); }
      if (hasSegment(3)) { context.moveTo(3.5 * SCALE, 3 * SCALE); context.lineTo(4.5 * SCALE, 3 * SCALE); }
      if (hasSegment(4)) { context.moveTo(3.5 * SCALE, 2 * SCALE); context.lineTo(3.5 * SCALE, 3 * SCALE); }
      if (hasSegment(5)) { context.moveTo(3.5 * SCALE, 1 * SCALE); context.lineTo(3.5 * SCALE, 2 * SCALE); }
      if (hasSegment(6)) { context.moveTo(3.5 * SCALE, 2 * SCALE); context.lineTo(4.5 * SCALE, 2 * SCALE); }
      canvas.stroke(this);
    },
    fill: FILL,
    offset: OFFSET,
    stroke: STROKE,
    strokeWidth: STROKE_WIDTH
  });
}

function CLOCK() {
  return new Kinetic.Shape({
    drawFunc: function(canvas) {
      var context = canvas.getContext()
      context.beginPath()
      context.rect(SCALE, 0, SCALE*4, SCALE*4)
      canvas.fillStroke(this)
      context.moveTo(SCALE * 5, SCALE*2) 
      context.lineTo(SCALE * 7, SCALE*2) 
      context.moveTo(SCALE * 2, SCALE*1) 
      context.lineTo(SCALE * 2, SCALE*3) 
      context.lineTo(SCALE * 3, SCALE*3) 
      context.lineTo(SCALE * 3, SCALE*1) 
      context.lineTo(SCALE * 4, SCALE*1) 
      context.lineTo(SCALE * 4, SCALE*3) 
      canvas.stroke(this)
    },
    fill: FILL,
    stroke: STROKE,
    offset: OFFSET,
    strokeWidth: STROKE_WIDTH
  })
}

function CONSTANT(state) {
  return new Kinetic.Shape({
    drawFunc: function(canvas) {
      var context = canvas.getContext()
      context.beginPath()
      context.rect(SCALE, 0, SCALE*4, SCALE*4)
      canvas.fillStroke(this)
      if (state) {
        context.moveTo(SCALE * 3, SCALE*1) 
        context.lineTo(SCALE * 3, SCALE*3) 
      } else {
        context.moveTo(SCALE*4, SCALE*2)
        context.arc(SCALE* 3, SCALE*2, SCALE, 0, Math.PI*2, true);
      }
      context.moveTo(SCALE * 5, SCALE*2) 
      context.lineTo(SCALE * 7, SCALE*2) 
      canvas.stroke(this)

    },
    fill: FILL,
    stroke: STROKE,
    offset: OFFSET,
    strokeWidth: STROKE_WIDTH
  })
}

function SWITCH(pressed) {
  return new Kinetic.Shape({
    drawFunc: function(canvas) {
      var context = canvas.getContext()
      context.beginPath()
      context.rect(SCALE, 0, SCALE*4, SCALE*4)
      context.rect(SCALE * 2, SCALE * .5, SCALE*2, SCALE*3)
      context.moveTo(SCALE * 4, SCALE * 2)
      context.lineTo(SCALE * 7, SCALE * 2)
      canvas.fillStroke(this)
      
      context.beginPath()
      context.rect(SCALE*2.5, SCALE * (pressed?1:2), SCALE, SCALE)
      this.setFill(pressed?HIGH:LOW)
      
      canvas.fillStroke(this)
      this.setFill(FILL)
    },
    fill: FILL,
    stroke: STROKE,
    offset: OFFSET,
    strokeWidth: STROKE_WIDTH
 })
}


function BUTTON(pressed) {
  return new Kinetic.Shape({
    drawFunc: function(canvas) {
      var context = canvas.getContext()
      context.beginPath()
      context.moveTo(SCALE, 0)
      context.lineTo(SCALE * 5, 0)
      context.lineTo(SCALE * 5,SCALE * 4)
      context.lineTo(SCALE,SCALE * 4)
      context.closePath()
      canvas.fillStroke(this)

      context.beginPath()
      context.moveTo(SCALE*7, SCALE*2)
      context.arc(SCALE * 3, SCALE * 2, SCALE, 0, Math.PI*2, true)
      
      this.setFill(pressed? HIGH:LOW)
      canvas.fillStroke(this)
      this.setFill(FILL)
    },
    fill: FILL,
    stroke: STROKE,
    strokeWidth: STROKE_WIDTH,
    offset: OFFSET,
 })
}

function AND(inv) {
  return new Kinetic.Shape({
    drawFunc: function(canvas) {
      var context = canvas.getContext();
      //Draw inputs and outputs first.
      context.beginPath();
      //Top input
      context.moveTo(0,SCALE);
      context.lineTo(SCALE,SCALE);
      //Bot input
      context.moveTo(0,SCALE*3);
      context.lineTo(SCALE,SCALE*3);
      //Output
      context.moveTo(SCALE*5,SCALE*2)
      context.lineTo(SCALE*7,SCALE*2)
      //Perform draw
      canvas.fillStroke(this);
      
      //Draw body
      context.beginPath();

      //Top
      context.moveTo(SCALE,0);
      context.lineTo(SCALE*3, 0);
      //Curve
      if (!inv) {
        context.arc(SCALE*3, SCALE*2, SCALE*2, Math.PI*3/2, Math.PI/2, false)
      } else {// 'o' at the end for 'not'
        context.arc(SCALE*3, SCALE*2, SCALE*2, Math.PI*3/2, 0, false)
        context.arc(SCALE*5+SCALE/4, SCALE*2, SCALE/4, Math.PI, Math.PI*3, false)
        context.arc(SCALE*3, SCALE*2, SCALE*2, 0, Math.PI/2, false)
      } 
      //Bottom
      context.lineTo(SCALE,SCALE*4)
      
      //Perform draw
      context.closePath();
      canvas.fillStroke(this);
    },
    fill: FILL,
    stroke: STROKE,
    offset: OFFSET,
    strokeWidth: STROKE_WIDTH
  })
}

function XOR(inv) {
  return new Kinetic.Shape({
    drawFunc: function(canvas) {
      var context = canvas.getContext();
      //Draw inputs and outputs first.
      context.beginPath();
      //Top input
      context.moveTo(0,SCALE);
      context.lineTo(SCALE*2,SCALE);
      //Bot input
      context.moveTo(0,SCALE*3);
      context.lineTo(SCALE*2,SCALE*3);
      //Output
      context.moveTo(SCALE*4,SCALE*2)
      context.lineTo(SCALE*7,SCALE*2)
      //Perform draw
      canvas.fillStroke(this);
     
      context.beginPath();
      context.moveTo(0, SCALE*4) 
//      context.arc(0,SCALE*2, SCALE*2, Math.PI/2, -Math.PI/2, true);
      context.arc(-1.5 * SCALE, 2*SCALE, 2.5*SCALE, .928, -.928, true)
      canvas.stroke(this);


      context.beginPath();
      context.moveTo(0.5*SCALE, SCALE*4) 
      context.arc(-1 * SCALE, 2*SCALE, 2.5*SCALE, .928, -.928, true)

      context.arc(SCALE * 0.5,SCALE*6.25, SCALE*6.25, -Math.PI/2, -Math.PI/4-.01, false); 
      //-.01 because of some math error that makes things go too far
      if (inv)
        context.arc(SCALE*5+SCALE/4, SCALE*2, SCALE/4, Math.PI, Math.PI*3, false)
      context.arc(SCALE * 0.5,SCALE*-2.25, SCALE*6.25, Math.PI/4, Math.PI/2, false);

      canvas.fillStroke(this);
    },
    fill: FILL,
    stroke: STROKE,
    strokeWidth: STROKE_WIDTH,
    offset: OFFSET,
  })
}


function OR(inv) {
  return new Kinetic.Shape({
    drawFunc: function(canvas) {
      var context = canvas.getContext();
      //Draw inputs and outputs first.
      context.beginPath();
      //Top input
      context.moveTo(0,SCALE);
      context.lineTo(SCALE*2,SCALE);
      //Bot input
      context.moveTo(0,SCALE*3);
      context.lineTo(SCALE*2,SCALE*3);
      //Output
      context.moveTo(SCALE*4,SCALE*2)
      context.lineTo(SCALE*7,SCALE*2)
      //Perform draw
      canvas.fillStroke(this);
     
      context.beginPath();
      context.moveTo(0, SCALE*4) 
//      context.arc(0,SCALE*2, SCALE*2, Math.PI/2, -Math.PI/2, true);
      context.arc(-1.5 * SCALE, 2*SCALE, 2.5*SCALE, .928, -.928, true)

      context.arc(0,SCALE*7, SCALE*7, -Math.PI/2, -Math.PI/4-.01, false); 
      //-.01 because of some math error that makes things go too far
      if (inv)
        context.arc(SCALE*5+SCALE/4, SCALE*2, SCALE/4, Math.PI, Math.PI*3, false)
      context.arc(0,SCALE*-3, SCALE*7, Math.PI/4, Math.PI/2, false);

      canvas.fillStroke(this);
    },
    fill: FILL,
    stroke: STROKE,
    offset: OFFSET,
    strokeWidth: STROKE_WIDTH
  })
}

function NOT(inv) {
  return new Kinetic.Shape({
    drawFunc: function(canvas) {
      var context = canvas.getContext()
      //Draw inputs and outputs first.
      context.beginPath();
      //Input and output are in line with eachother. Draw them with 1 line.
      context.moveTo(0, SCALE*2)
      context.lineTo(SCALE*7, SCALE*2)
      canvas.fillStroke(this);
      
      context.beginPath();
      context.moveTo(SCALE, 0)
      context.lineTo(SCALE*5, SCALE*2)
      if (inv)
        context.arc(SCALE*5+SCALE/4, SCALE*2, SCALE/4, Math.PI, Math.PI*3, false)
      context.lineTo(SCALE, SCALE*4)
      context.closePath()
      //Perform draw
      canvas.fillStroke(this);

    },
    fill: FILL,
    stroke: STROKE,
    offset: OFFSET,
    strokeWidth: STROKE_WIDTH
  })
}


var stage;
var layer;
window.onload = function () {
  var row=0, col=0, objs = [];
  stage = new Kinetic.Stage({
    container: 'container',
    width: window.innerWidth,
    height:window.innerHeight,
    draggable:true
  });

  layer = new Kinetic.Layer();
  stage.add(layer);

  function nextRow() {
    col = 0
    row ++;
  }
  function add(obj) {
    var x = col * SCALE * 9
    var y = row * SCALE * 5
    col ++;
    if (obj === undefined) return;
    var box = new Kinetic.Rect({
      x: x, //- SCALE * .25,
      y: y, //- SCALE * .25,
      width: SCALE *8,// 7.5,
      height: SCALE *4,// 4.5,
      stroke: '#000',
      strokeWidth: 1
    })
    layer.add(box)

    obj.setPosition(x + SCALE*3.5,y + SCALE*2)
    //obj.rotate((col-1)*Math.PI)
    layer.add(obj)
    objs.push(obj)
  }
  add(AND(false))
  add(AND(true))
  add(OR(false))
  add(OR(true))
  add(XOR(false))
  add(XOR(true))
  add(NOT(false))
  add(NOT(true))
  nextRow()

  add(BUTTON(false))
  add(BUTTON(true))
  add(SWITCH(false))
  add(SWITCH(true))
  add()
  add(CLOCK())
  add(CONSTANT(true))
  add(CONSTANT(false))
  nextRow()

  add(BULB(false)) 
  add(BULB(true)) 
  nextRow()
  for(var i = 0 ; i < 16 ; i++) 
  {
    add(SEGMENT(i))
    if(i%4==3) nextRow()
  }
  nextRow()

  stage.draw();
/*
  (new Kinetic.Animation(
  function(frame) {
    for(var key in objs) {
    objs[key].setScale(12.5 + 2.5*Math.sin(frame.time/1000));//Rotation(frame.time/1000)
    }
  },layer)).start()/**/
}

