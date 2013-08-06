/*global define*/
"use strict";

/*
 * App serves as the hub that connects each of the pieces
 */
define(["Kinetic", "Stage", "Toolbox", "Workspace", "ActiveLayer", "Anchor"],
  function (K, S, T, W, A, Anchor) {

    /*
     * Loading the App causes each of the pieces to get loaded
     * once loaded, all of the overrides are applied to connection functionality
    */
    function load() {
      W.load();
      T.load();
      A.load();
      T.setOnGateCreatedCallback(A.addAndDragGate);
      A.setOnGateAdded(W.addGate);
      A.setOnAddOrDestroyConnection(W.addOrDestroyConnection);
      Anchor.prototype.anchorConnectionStart = A.anchorStart;
    }

    /*
     * starting the App adds each of the layers to the stage
     * 
     */
    function start() {
      //Bottom Layer
      S.add(W.getLayer());
      S.add(T.getLayer());
      S.add(A.getLayer());
      //Top layer
    }

    /*
     * public exports
     */
    return {
      load: load,
      start: start
    };
  });
