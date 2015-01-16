/*global define, extend*/
"use strict";

define(["../Base", "Kinetic"], function (Base, Kinetic) {
  var SCALE = 15,
    shapeConf = {stroke: "#000", stroke_width: 3},
    AndGate;

  shapeConf.drawFunc = function (canvas) {
    var context = canvas.getContext();
    context.beginPath();
    context.rect(SCALE, 0, SCALE * 4, SCALE * 4);
    canvas.fillStroke(this);
  };

  AndGate = function () {
    Base.call(this, 2,
      new Kinetic.Shape(shapeConf),
      1);
    this.setDraggable(true);
  };
  Kinetic.Util.extend(AndGate, Base);

  return AndGate;
});
