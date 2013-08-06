/*global define*/
"use strict";

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
define(["Kinetic", "UI"], function (Kinetic, UI) {

  //Constructor
  var Connection = function () {
    var config = UI.Connection;
    this.endPoints = [undefined, undefined];//out -> in
    this.points = [[0, 0], [0, 0]];
    config.points = this.points;
    Kinetic.Line.call(this, config);
  };

  Connection.prototype.setOutAnchor =
    function (anchor) {
      this.endPoints[0] = anchor;
      this.onAnchorMove(anchor);
      anchor.addConnection(this);
    };

  Connection.prototype.setToAnchor =
    function (anchor) {
      this.endPoints[1] = anchor;
      this.onAnchorMove(anchor);
      anchor.addConnection(this);
    };

  Connection.prototype.onAnchorMove =
    function (anchor) {
      if (anchor === this.endPoints[0]) {
        this.setOutPoint(anchor.getAbsolutePosition());
      } else if (anchor === this.endPoints[1]) {
        this.setInPoint(anchor.getAbsolutePosition());
      } else {
        console.error("bad anchor move on connection", this, anchor);
      }
    };

  Connection.prototype.setOutPoint =
    function (p) {
      this.points[0] = [p.x, p.y];
      this.setPoints(this.points);
    };

  Connection.prototype.setInPoint =
    function (p) {
      this.points[1] = [p.x, p.y];
      this.setPoints(this.points);
    };

  Connection.prototype.getOutPoint =
    function () {
      return this.points[0];
    };

  Connection.prototype.getInPoint =
    function () {
      return this.points[1];
    };

  Connection.prototype.destroy =
    function () {
      Kinetic.Line.prototype.destroy.call(this);
      if (this.endPoints[0]) {
        this.endPoints[0].removeConnection(this);
      }
      if (this.endPoints[1]) {
        this.endPoints[1].removeConnection(this);
      }
    };

  Kinetic.Util.extend(Connection, Kinetic.Line);
  return Connection;
});
