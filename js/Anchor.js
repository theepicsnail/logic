define(["Kinetic","UI", "UID"], function(Kinetic, UI, UID) {
  Kinetic.Anchor = function(direction) {
    this._initAnchor(UI.Anchor, direction);
  }; 
  Kinetic.Anchor.prototype = {
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
    anchorConnectionStart: function(anchor) {
      console.log("anchor connection start.", anchor)
    },
    
  };
  Kinetic.Util.extend(Kinetic.Anchor, Kinetic.Circle);
  return Kinetic.Anchor 
})
