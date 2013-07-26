/*
 * Gates are the building blocks of a project, these are the logic gates that
 * are connected in the workbench to build a circuit. 
 *
 * Gates have a set of inputs and a set of outputs in the more general case.
 * Currently these have 1 or 2 inputs (depending on type), and one output.
 * 
 * TODO: this is currently using 'public' ... BAD!
 */
define(["Kinetic", "Resources", "UI", "UID", "Anchor"], 
function(K,         R,           UI,   UID,   Anchor) {
  //the 'public' object is exported
  public = {}
  
  /*
   * newGate constructs a new gate from the given type type is a string that 
   * lines up with one of the names of gates in Resource.js
   * "AND", "XOR", "NOT", etc...
   *
   * This returns a group that is the collection that contains the image on
   * bottom, and the anchors above it.
   *
   */
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
