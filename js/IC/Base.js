/*global define*/
"use strict";
define(["Kinetic", "../Anchor"], function (Kinetic, Anchor) {
  var ICBase = function (inAnchors, baseGroup, outAnchors) {
    var i;
    Kinetic.Group.call(this);

    this.inputAnchors = inAnchors;
    this.outputAnchors = outAnchors;
    this.base = baseGroup;

    this.add(baseGroup);

    console.log("in:", inAnchors, "out", outAnchors);
    for (i = inAnchors - 1; i >= 0; i -= 1) {
      this.add(new Anchor("in"));
    }
    for (i = outAnchors - 1; i >= 0; i -= 1) {
      this.add(new Anchor("out"));
    }
    console.log(this);
  };

  Kinetic.Util.extend(ICBase, Kinetic.Group);
  return ICBase;
});
