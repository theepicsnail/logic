define(["Kinetic", "Resources", "UI", "UID"], function(K, R, UI, UID) {
  public = {}
  
  function anchorConnectionStart(anchor) {
    console.log("Anchor connection start.", anchor)
  }

  function newAnchor(name) {
    var anchor = new K.Circle(UI.Anchor)
    anchor.setName(name)
    anchor.setId(name + UID.next())
    anchor.on('mousedown', function(e) {
      e.bubbles= false
      e.cancelBubble = true
      anchorConnectionStart(anchor)
    })

    return anchor
  }

  public.newGate = function(type) {
    var gateGroup = new K.Group()
    gateGroup.add(R.newImage(type))
    
    var out = newAnchor("out")
    gateGroup.add(out)
    out.setPosition(76,16)

    var in1 = newAnchor("in")
    gateGroup.add(in1)

    if (type == "NOT") {
      in1.setPosition(4,17)
    } else {
      in1.setPosition(4,10)

      var in2 = newAnchor("in")
      gateGroup.add(in2)
      in2.setPosition(4,25)
    }    
    return gateGroup
  }

  public.setOnAnchorConnectionStart = function(cb) {
    anchorConnectionStart = cb;
  }
  return public;
});
