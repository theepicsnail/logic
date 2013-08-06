/*global define,removeA*/
"use strict";

/*
 * Anchor is a class that represents an endpoint of a gate that a connection
 * can connect to. This extends Kinetic.Line
 *
 * TODO: Figure out how to properly extend Kinetic objects while keeping in 
 * require.js AMD format.
 */
define(["Kinetic", "UI", "UID"], function (Kinetic, UI, UID) {

  var Anchor = function (direction) {
    Kinetic.Circle.call(this, UI.Anchor);
    this.connections = [];
    this.direction = direction;
    this.setName(direction);
    this.setId(direction + UID.next());
    var self = this;
    this.on('mousedown', function (e) {
      e.bubbles = false;
      e.cancelBubble = true;
      self.anchorConnectionStart(self);
    });
  };

  Anchor.prototype.addConnection =
    function (conn) {
      if (this.direction === "in" && this.connections[0]) {
        this.connections.pop().destroy();
      }
      this.connections.push(conn);
    };

  Anchor.prototype.removeConnection =
    function (conn) {
      removeA(this.connections, conn);
    };

  Anchor.prototype.anchorConnectionStart =
    function (anchor) {
    };

  Anchor.prototype.onParentMove =
    function () {
      var i;
      for (i = this.connections.length - 1; i >= 0; i -= 1) {
        this.connections[i].onAnchorMove(this);
      }
    };

  //Extend Kinetic.Circle
  Kinetic.Util.extend(Anchor, Kinetic.Circle);
  return Anchor;
});
