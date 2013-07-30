/*
 * Anchor is a class that represents an endpoint of a gate that a connection
 * can connect to. This extends Kinetic.Line
 *
 * TODO: Figure out how to properly extend Kinetic objects while keeping in 
 * require.js AMD format.
 */
define(["Kinetic","UI", "UID"], function(Kinetic, UI, UID) {

  Anchor = function(direction) {
    Kinetic.Circle.call(this, UI.Anchor)
    this.direction = direction
    this.setName(direction)
    this.setId(name + UID.next())
    var self = this;
    this.on('mousedown', function(e) {
      e.bubbles = false
      e.cancelBubble = true
      self.anchorConnectionStart(self)
    })
  }

  Anchor.prototype.anchorConnectionStart = 
  function(anchor) {
    
  }

  //Extend Kinetic.Circle
  Kinetic.Util.extend(Anchor, Kinetic.Circle);
  return Anchor 
})
