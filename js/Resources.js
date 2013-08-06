/*global define*/
"use strict";

/*
 * Resources.js stores the gate image file, and is responsible for creating the
 * Kinetic.Image objects that are used by gates.
 */
define(["Kinetic", "UID"], function (K, UID) {

  //Same order as gates.png
  var gateNames = ["NOT", "AND", "NAND", "OR", "NOR", "XOR", "XNOR"],
    gateImage,
    images = {}; // map[string] => Kinetic.Image

  /*
   * Perform the actual parsing of the image, this splits it into the approriate
   * gate images, and adds them to the image map.
   */
  function parseGateImage() {
    var i = 0;
    //Each image is 162,64 located at (0, 64*n)
    for (i = gateNames.length - 1; i >= 0; i -= 1) {
      images[gateNames[i]] = new K.Image({
        image: gateImage,
        crop: {
          x: 0,
          y: 64 * i,
          width: 162,
          height: 64
        },
        width: 162,
        height: 64
      });
    }
  }

  /*
   * Called during loading. The provided callback points to the next step of the
   * loading process and should be called once the image has been loaded and 
   * parsed.
   */
  function loadResources(callback) {
    gateImage = new Image();
    gateImage.onload = function () {
      parseGateImage();
      callback();
    };
    gateImage.src = "images/gates.png";
  }

  /*
   * Provide a new Kinetic.Image from the given name. The name should be one of
   * the approriate gate names listed above.
   */
  function getNewImage(gateName) {
    var img = images[gateName];
    return new K.Image({
      image: img.getImage(),
      crop: img.getCrop(),
      width: 81,
      height: 32,
      name: gateName,
      id: "gate" + UID.next()
    });
  }

  /*
   * public exports
   */
  return {
    load: loadResources,
    newImage: getNewImage,
    gates: gateNames,
  };
});
