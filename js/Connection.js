define(["Kinetic", "UI"], function(Kinetic,UI){
  Kinetic.Connection = function() {
    this._initConnection(UI.Connection);
  };

  Kinetic.Connection.prototype = {
    _initConnection: function(config) {
      this.points=[[0,0],[0,0]]
      config.points = this.points
      Kinetic.Line.call(this, config);
    },
    setOutAnchor: function(anchor) { 
      var p = anchor.getAbsolutePosition()
      this.points[0] = [p.x, p.y]
      var self = this
      anchor.getParent().on('dragmove', function(e) {
        var p = anchor.getAbsolutePosition()
        self.points[0] = [p.x, p.y]
        self.setPoints(self.points)
      })
    },
    setToAnchor: function(anchor) { 
      var p = anchor.getAbsolutePosition()
      this.points[1] = [p.x, p.y]
      var self = this
      anchor.getParent().on('dragmove', function(e) {
        var p = anchor.getAbsolutePosition()
        self.points[1] = [p.x, p.y]
        self.setPoints(self.points)
      })
    },


    setOutPoint: function(p) {
      this.points[0] = [p.x, p.y]
      this.setPoints(this.points)
    },
    setInPoint: function(p) {
      this.points[1] = [p.x, p.y]
      this.setPoints(this.points)
    },
    getOutPoint: function() {
      return this.points[0]
    },
    getInPoint: function() {
      return this.points[1]
    },
    };

  Kinetic.Util.extend(Kinetic.Connection, Kinetic.Line);
  return Kinetic.Connection
})
