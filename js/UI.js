/*global define*/
"use strict";

/*
 * Most of the objects in this application take a config object during
 * construction. This is the source of those config objects, from here
 * most of the UI initialization can be controlled.
 */
define({
  /*
   * Toolbox.js uses this for the containing rectangle
   * Object: Kinetic.Rect
   */
  Toolbox: {
    x: 1,
    y: 1,
    width: 200,
    height: 196,//window.innerHeight,
    fill: '#DFD',
    stroke: 'black'
  },
  /*
   * Anchor.js uses this to construct the anchorsthat are added to gates
   * Object: Kinetic.Circle
   */
  Anchor: {
    radius: 5,
    stroke: 'black',
    strokeWidth: 2,
    fill: '#DDD'
  },
  /*
   * ActiveLayer.js uses this during connection creation. This is the target
   * circle that helps select the anchor to connect to.
   * Object: Kinetic.Circle
   */
  DragAnchor: {
    radius: 7,
    stroke: 'black',
    strokeWidth: 2
  },
  /*
   * Connection.js uses this as the config for its superclass. This controls
   * how connections look in the workspace and while being created.
   * Object: Kinetic.Line
   */
  Connection: {
    stroke: 'blue',
    strokeWidth: 2,
  },
  /*
   *
   */
  Shape: {
    stroke: 'black',
    strokeWidth: 3,
  }
});
