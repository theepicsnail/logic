/*function ShareButton() {
  var g = new Kinetic.Layer()
  var t = new Kinetic.Text({text:"Share", fill:"black", fontSize:20})
  var pad = 10
  var height = pad*2 + t.getHeight()

  var b = new Kinetic.Rect({
    x:-pad, y:-pad, width: pad*2+t.getWidth(), height:height,
    cornerRadius: 2,
    stroke:"black", strokeWidth: 2,
    fillLinearGradientStartPoint: [0, height],
    fillLinearGradientEndPoint: [0, height- 6],
    fillLinearGradientColorStops:[0, '#0A0', 1, '#6D6']
  })
  
  g.add(b)
  g.add(t)
  g.on('click', function() {
    alert("Click.")      
  });

  return g
}
*/


/*
Input
  Momentary
  Toggle
  Clock
Gates
  
Output
  Led
    1 input
  7 - segment display
    4 inputs [Shows 0-F]
  Led matrix (8x8)
    6 address bits (3 row, 3 col)
    1 data bit
    1 clock bit
Flip flops
Other
  Bus stuff?
ICs
  Custom ICs
  Perhaps an example one?

*/


/**
  Constructs a menu without any contents or next value
  a menu looks like:
  +--------------+
  |    title     |
  +--------------+
  |              |
  |  menu        |
  |     body     |
  |              |
  +--------------+
  |  Next group  | 
  +--------------+

*/
var menuWidth = 200 
function BaseMenu(title, menuContent) {
  var pad = 5
  var titleHeight=30  

  //Group of elements that make up the title (bg box and test)
  var titleGroup = new Kinetic.Group()

  var titleBox = new Kinetic.Rect({
    x:0, 
    y:0, 
    width: menuWidth, 
    height: titleHeight, 
    cornerRadius:2,
    stroke: 'black',
    fill: '#ddd',
    strokeWidth: 3})

  var titleText = new Kinetic.Text({x:pad, y:pad, text:title + " -", fill:'black', fontSize:15})
  titleText.setX((menuWidth-titleText.getWidth())/2)
  
  titleGroup.add(titleBox)
  titleGroup.add(titleText)
  //title built.
  menuContent.setPosition(0, titleHeight)

  //Set up the group for the next menu to attach onto. 
  var nextGroup = new Kinetic.Group({x:0, y:titleHeight + menuContent.getHeight(), width:menuWidth, height:0})

  //Put it all together into a menuGroup
  var menuGroup = new Kinetic.Group()
  menuGroup.add(menuContent) // Menu content goes under the titles 
  menuGroup.add(nextGroup)   // Next groups title goes under this groups title
  menuGroup.add(titleGroup)  
 
  menuGroup.addToggler = function() {
    //Attach the listeners that deal with the collapsing and what not.
    var contentTween = new Kinetic.Tween({
        node: menuContent,
        scaleY: 0,
        easing: Kinetic.Easings.StrongEaseIn,
        duration: .5
    });
    var chainTween = new Kinetic.Tween({
        node: nextGroup,
        y:titleHeight,
        easing: Kinetic.Easings.StrongEaseIn,
        duration: .5
    });
    var collapsed = false
    titleGroup.on('click', function() {
      if(!collapsed) {
        titleText.setText(title + " +") 
        contentTween.play()
        chainTween.play()
      }
      else {
        titleText.setText(title + " -") 
        contentTween.reverse()
        chainTween.reverse()
      }
      console.log(collapsed)
      collapsed = !collapsed
    })
  }
  menuGroup.totalHeight = function() {
    var nextHeight  = 0;
    if(nextGroup.children.length)
      nextHeight = nextGroup.children[0].totalHeight()
    return titleHeight + menuContent.getHeight() * menuContent.getScaleY() + nextHeight
  }
  menuGroup.next = nextGroup
  return menuGroup
}

function InputMenu() {
  var group = new Kinetic.Group({width:menuWidth, height:40})
  group.add(new Kinetic.Rect({width:menuWidth,height:40, strokeWidth:4, fill:'red'}))
  return BaseMenu("Input", group)
}

function GateMenu() {
  var group = new Kinetic.Group({width:menuWidth, height:40})
  group.add(new Kinetic.Rect({width:menuWidth,height:40, strokeWidth:4, fill:'red'}))
  return BaseMenu("Gates", group)
}

function OutputMenu() {
  var group = new Kinetic.Group({width:menuWidth, height:40})
  group.add(new Kinetic.Rect({width:menuWidth,height:40, strokeWidth:4, fill:'red'}))
  return BaseMenu("Output", group)
}

function FlipFlopMenu() {
  var group = new Kinetic.Group({width:menuWidth, height:40})
  group.add(new Kinetic.Rect({width:menuWidth,height:40, strokeWidth:4, fill:'red'}))
  return BaseMenu("FlipFlop", group)
}

function OtherMenu() {
  var group = new Kinetic.Group({width:menuWidth, height:40})
  group.add(new Kinetic.Rect({width:menuWidth,height:40, strokeWidth:4, fill:'red'}))
  return BaseMenu("Other", group)
}

function ICMenu() {
  var group = new Kinetic.Group({width:menuWidth, height:40})
  group.add(new Kinetic.Rect({width:menuWidth,height:40, strokeWidth:4, fill:'red'}))
  return BaseMenu("ICs", group)
}

function MenuStack() {
  var inputs = InputMenu()
  var gates = GateMenu()
  var outputs = OutputMenu()
  var flipflops = FlipFlopMenu()
  var other = OtherMenu()
  var ics = ICMenu()
  inputs.next.add(gates)
  gates.next.add(outputs)
  outputs.next.add(flipflops)
  flipflops.next.add(other)
  other.next.add(ics)

  var layer = new Kinetic.Layer()
  layer.add(inputs)
  
  inputs.addToggler()
  gates.addToggler()
  outputs.addToggler()
  flipflops.addToggler()
  other.addToggler()
  ics.addToggler()

  return layer
}



var stage;
window.onload = function () {

  stage = new Kinetic.Stage({
    container: 'container',
    width: window.innerWidth,
    height:window.innerHeight,
  });



  //b = ShareButton()
  //b.setPosition((stage.getWidth() - b.getWidth())/2, b.getHeight()+5)
  //stage.add(b)

  stage.add(MenuStack())
}

