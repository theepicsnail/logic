/*global define*/
"use strict";

/*
 * The stage is the base Kinetic drawing point. Everything that is visible to
 * the user is (through some path) added onto the stage.
 *
 * This is a singleton module
 */
define(["Kinetic"], function (Kinetic) {
  var stage = new Kinetic.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight
  });

  //Currently there's nothing that uses this, but resize the stage anyway.
  window.onresize = function (e) {
    stage.setSize(window.innerWidth,
                  window.innerHeight);
  };

  return stage;
});
