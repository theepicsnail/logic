/*global define*/
"use strict";

/*
 * Workspace is a singleton that exports some manipulator methods. The workspace
 * serves as a layer to store all of the gates that are in a project. It also 
 * holds the connections between these gates. 
 *
 * The workspace is responsible for keeping connections and gates in a valid
 * state. E.g. no floating wires, deleting a gate should remove the connected
 * wires, etc..
 */
define(["Kinetic", "IC/Gate/And"], function (K, AND) {

  //Kineticjs Layer that stores everything
  var layer;

  /*
   * Do any workspace initialization here. Presently it only creates the layer
   * object. In theory this might be handed a project to construct. 
   */
  function load() {
    layer = new K.Layer();
    addGate(new AND());
  }

  /*
   * When a gate is dropped from the active layer to the workspace layer, it is 
   * passed through here. 
   */
  function addGate(gate) {
    layer.add(gate);
    layer.draw();
  }

  /*
   * Attempt to add the given connection to the workspace. If the workspace can 
   * not find nodes to connect each end of the connection, then destroy the 
   * connection.
   */
  function addOrDestroyConnection(conn) {
    var ANCHOR_RADIUS_SQUARED = 49,

    //Try to find an 'in' anchor to anchor the connections 'in' point to.
      pt = conn.getInPoint(),
      x = pt[0],
      y = pt[1],
      connectFrom,//undefined
      connectTo; //undefined

    layer.get(".in").each(function (f) {
      var pt2 = f.getAbsolutePosition(),
        dx = pt2.x - x,
        dy = pt2.y - y;

      if (dx * dx + dy * dy <= ANCHOR_RADIUS_SQUARED) {
        connectTo = f;
      }
    });

    if (connectTo === undefined) {
      //Nothing connected, destroy and exit.
      conn.destroy();
      return;
    }

    //Try to find an 'out' anchor to connect to
    pt = conn.getOutPoint();
    x = pt[0];
    y = pt[1];
    layer.get(".out").each(function (f) {
      var pt2 = f.getAbsolutePosition(),
        dx = pt2.x - x,
        dy = pt2.y - y;
      if (dx * dx + dy * dy <= ANCHOR_RADIUS_SQUARED) {
        connectFrom = f;
      }
    });
    if (connectFrom === undefined) {
      conn.destroy();
      return;
    }

    //Found both in an out. Attach the connection to those anchors.
    conn.setOutAnchor(connectFrom);
    conn.setToAnchor(connectTo);
    layer.add(conn);
    layer.draw();
  }

  /*
   * Export any public functions
   */
  return {
    load: load,
    getLayer: function () {return layer; },
    addGate: addGate,
    addOrDestroyConnection: addOrDestroyConnection
  };
});
