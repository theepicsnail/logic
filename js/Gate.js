/*global define*/
"use strict";

/*
 * Gates are the building blocks of a project, these are the logic gates that
 * are connected in the workbench to build a circuit. 
 *
 * Gates have a set of inputs and a set of outputs in the more general case.
 * Currently these have 1 or 2 inputs (depending on type), and one output.
 * 
 */
define(["Kinetic", "Resources", "UI", "UID", "Anchor"],
  function (Kinetic, R,           UI,   UID,   Anchor) {
    var Gate = function (inputs, image, logicCallback) {
      var i, anchor,
        inputDy = 48 / (inputs + 1),
        self = this;
      Kinetic.Group.call(this);
      this.inputs = [];
      this.outputs = [];
      this.add(image);

      for (i = 0; i < inputs; i += 1) {
        anchor = new Anchor("in");
        anchor.setPosition(4, inputDy * (i + 1) - 8);
        this.inputs[i] = anchor;
        this.add(anchor);
      }

      anchor = new Anchor("out");
      anchor.setPosition(76, 16);
      this.outputs[0] = anchor;
      this.add(anchor);

      this.on('dragmove', function (evt) {self.onMove(evt); });
    };

    Gate.prototype.onMove =
      function (evt) {
        var i;
        for (i = this.inputs.length - 1; i >= 0; i -= 1) {
          this.inputs[i].onParentMove();
        }
        for (i = this.outputs.length - 1; i >= 0; i -= 1) {
          this.outputs[i].onParentMove();
        }
      };

    Kinetic.Util.extend(Gate, Kinetic.Group);

    return {
      AND:  function () { return new Gate(2, R.newImage("AND")); },
      NAND: function () { return new Gate(2, R.newImage("NAND")); },
      OR:   function () { return new Gate(2, R.newImage("OR"));  },
      NOR:  function () { return new Gate(2, R.newImage("NOR")); },
      XOR:  function () { return new Gate(2, R.newImage("XOR")); },
      XNOR: function () { return new Gate(2, R.newImage("XNOR")); },
      NOT:  function () { return new Gate(1, R.newImage("NOT")); }
    };
  });
