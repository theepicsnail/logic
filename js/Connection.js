/*
 * Connection objects connect two anchor objects and is represented by a line
 * between the two anchors. The anchors must be of opposite directions (in/out)
 *
 * The connection object has two families of mutators:
 * 1) Anchor based mutators, these mutators will attach drag listeners to the 
 *    anchors parent and update itself while the parent is moving
 * 2) Point based mutators, these are used during the creation stage of the
 *    anchors life. These don't attach any new listeners, they just update the
 *    point, then redraw
 *
 * This object extends Kinetic.Line
 */
define(["Kinetic", "UI"], function(Kinetic,UI){

  //Constructor
  Kinetic.Connection = function() {
    this._initConnection(UI.Connection);
  };

  Kinetic.Connection.prototype = {
    //Constructor implementation
    _initConnection: function(config) {
      this.points=[[0,0],[0,0]]
      config.points = this.points
      Kinetic.Line.call(this, config);
    },
  
    /*
     * Anchor based mutators
     */
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

    /*
     * Point based mutators
     * The getters are used when a connection is being placed, this lets the 
     * workspace detect which point this connection should anchor to.
     */
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
