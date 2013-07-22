define(["Kinetic", "Resources", "UI", "UID", "Anchor"], 
function(K,         R,           UI,   UID,   Anchor) {
  public = {}
  
  public.newGate = function(type) {
    var gateGroup = new K.Group()
    gateGroup.add(R.newImage(type))
    
    var out = new Anchor("out")
    gateGroup.add(out)
    out.setPosition(76,16)

    var in1 = new Anchor("in")
    gateGroup.add(in1)

    if (type == "NOT") {
      in1.setPosition(4,17)
    } else {
      in1.setPosition(4,10)
      var in2 = new Anchor("in")
      gateGroup.add(in2)
      in2.setPosition(4,25)
    }

    return gateGroup
  }

  return public;
});
