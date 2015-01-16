/*global define*/
"use strict";

/*
 * Provides the user with a draggable set of gates to choose from.
 *
 * When a gate is pulled from the toolbox there are several steps involved
 * The gate being dragged is dropped, leaving it in the same place as before
 * the drag. A new gate is created and moved ontop of the gate you were just
 * dragging. That gate is picked up (dragging started). Then it is added to
 * the active layer, who deals with it from there.
 */
define(["Kinetic", "UI", "Resources", "Gate", "IC/Button"],
  function (K,         UI,   R,           Gate) {
    var group, layer;

    /*
    * Default implementation of onGateCreated, actual implementation is in
    * ActiveLayer.js:addAndDrag
    */
    function onGateCreated(e) {
      console.log(e);
    }

   /*
    * Helper for load(), this method adds the gate, as well as a listener
    * to trigger gate creation whenever a drag is about to start. 
    * This method ALSO serves to fix closure issues that occur with the 
    * listener callback, and getting the right gate referenced.
    */
    function addGateToToolbox(gate, x, y) {
      var g;
      //Add the gate to the group
      gate.setPosition(x, y);
      gate.on('mousedown', function (e) {
        //This is the listener for when a gate is dragged from the toolbox
        //read the module doc for an explanation of the series of events
        //that occur during a drag from the toolbox to the workspace.

        //Don't alert the toolbox listener
        e.bubbles = false;
        e.cancelBubble = true;

        if (onGateCreated) {
          g = Gate[gate.getName()]();
          g.setPosition(gate.getAbsolutePosition());
          onGateCreated(g);//To the active layer!
        }
      });
      group.add(gate);
    }

    /*
    * When the app starts up, this is called. Loading of the toolbox consists of 
    * creating the background and all of the gates that are contained in the tool
    * box. 
    * 
    * This method uses addGateToToolbox as a helper.
    *
    * TODO: More intelligent positioning
    * TODO: Resizability of the toolbox?
    */
    function load() {
      var leftCol = false,
        row = 0,
        panel = new K.Rect(UI.Toolbox),
        i,
        x,
        y,
        gate;

      group = new K.Group();
      group.setDraggable(true);
      group.add(panel);
      //Start out on the right for the NOT gate
      for (i = 0; i < R.gates.length; i += 1) {
        //get x,y and set us up for the next iteration
        x = 12;
        y = 12 + 46 * row;
        if (!leftCol) {
          x += 95;
          row += 1;
        }
        leftCol = !leftCol;

        gate = R.newImage(R.gates[i]);
        addGateToToolbox(gate, x, y);
      }
      layer = new K.Layer();
      layer.add(group);
    }


    /*
    * Public exports
    */
    return {
      load: load,
      getLayer: function () { return layer; },
      setOnGateCreatedCallback: function (cb) { onGateCreated = cb; },
    };
  });
