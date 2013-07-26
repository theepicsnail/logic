/*
 * Anchor is a class that represents an endpoint of a gate that a connection
 * can connect to. This extends Kinetic.Line
 *
 * TODO: Figure out how to properly extend Kinetic objects while keeping in 
 * require.js AMD format.
 */
define(["Kinetic","UI", "UID"], function(Kinetic, UI, UID) {

  //Constructor  
  Kinetic.Anchor = function(direction) {
    this._initAnchor(UI.Anchor, direction);
  }; 

  //Body
  Kinetic.Anchor.prototype = {    
    /*
     * Constructor implementation
     * config is the normal Kinetic.Circle constructor config
     * direction is "in" or "out" for which direction data flows through this anchor
     *
     * when an anchor is dragged, a new connection is started
     *
     */
    _initAnchor: function(config, direction) {
      Kinetic.Circle.call(this, config);
      this.Direction = direction
      this.setName(direction)
      this.setId(name + UID.next())
      var self = this;
      this.on('mousedown', function(e) {
        e.bubbles = false
        e.cancelBubble = true
        console.log(self, this)
        self.anchorConnectionStart(self)
      })
    },
    /*
     * This serves as a default anchorConnection function.
     * actual implementation is in ActiveLayer
     */
    anchorConnectionStart: function(anchor) {
      console.log("anchor connection start.", anchor)
    },
    
  };
  //Extend Kinetic.Circle
  Kinetic.Util.extend(Kinetic.Anchor, Kinetic.Circle);
  return Kinetic.Anchor 
})
