/*global define*/

/*
 * Active layer is a singleton that exports some manipulator methods. The active
 * layer hold any gate, connection, or group that is currently being held by the
 * user. (e.g. via mouse drag). 
 */
define(["Kinetic", "UI", "Connection"], function (K, UI, Connection) {
  "use strict";

  //Kineticjs layer that stores the active group
  var layer;

  /*
   * See: Workspace.js:addGate
   */
  function onGateAdded(g) {
    console.log("Added", g);
  }

  /*
   * See: Workspace.js:addOrDestroyConnection
   */
  function addOrDestroyConnection(conn) {
    console.log("Add or destroy:", conn);
  }

  /*
   * Called during startup, this function serves to initialize the active layer.
   * The active layer has minimal initialization, as by default it's empty.
   */
  function load() {
    layer = new K.Layer();
    layer.setOpacity(0.7);
  }

  /*
   * When a gate is pulled out of a toolbox this method gets called with that
   * gate. This adds it to the active layer, and starts the drag interaction for
   * it. Upon dropping the gate onGateAdded is called.
   *
   * TODO: Generalize this to just accepting a group. That will allow selecting
   * groups of elements then dragging them around to work.
   *
   */
  function addAndDrag(gate) {
    layer.add(gate);
    gate.setDraggable(true);
    gate.startDrag();
    gate.on('dragend',
      function (evt) {
        gate.remove();
        onGateAdded(gate);
        layer.draw();
      });
  }

  /*
   * When an anchor is dragged upon this gets called to start the active layer
   * line (connection object). When the dragging finishes, the connection is
   * sent to the workspace to be added or destroyed.
   */
  function anchorStart(anchor) {
    var c = new Connection(),
      dragAnchor = new K.Circle(UI.DragAnchor);
    layer.add(c);
    c.setInPoint(anchor.getAbsolutePosition());
    c.setOutPoint(anchor.getAbsolutePosition());

    dragAnchor.setPosition(anchor.getAbsolutePosition());
    layer.add(dragAnchor);
    dragAnchor.setDraggable(true);
    dragAnchor.startDrag();
    dragAnchor.on('dragmove', function (evt) {
      c.setInPoint(evt);
      layer.draw();
    });
    dragAnchor.on('dragend', function (evt) {
      dragAnchor.destroy();
      c.remove();
      addOrDestroyConnection(c);
      layer.draw();
    });
  }

  /*
   * public exports
   */
  return {
    anchorStart: anchorStart,
    load: load,
    addAndDragGate: addAndDrag,
    getLayer: function () { return layer; },
    setOnGateAdded: function (cb) { onGateAdded = cb; },
    setOnAddOrDestroyConnection: function (cb) { addOrDestroyConnection = cb; }
  };
});
