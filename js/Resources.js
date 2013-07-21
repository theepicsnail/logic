define(["Kinetic", "UID"], function(K, UID) {
  //Same order as gates.png
  var gateNames = ["NOT", "AND", "NAND", "OR", "NOR", "XOR", "XNOR"]  
  var gateImage = new Image();
  var images = {}

  function loadResources(callback) {
    gateImage.onload = function () {
      parseGateImage()
      callback()
    }
    gateImage.src = "images/gates.png"
  }

  function parseGateImage() {
    //Each image is 162,64 located at (0, 64*n)
    for (var i in gateNames) {
      images[gateNames[i]] = new K.Image({
        image: gateImage,
        crop: {
          x: 0, 
          y:64 * i,
          width: 162,
          height: 64},
        width: 162,
        height: 64
      })
    }   
  }

  function getNewImage(gateName) {
    var img = images[gateName] 
    return new K.Image({
      image: img.getImage(),
      crop: img.getCrop(),
      width: 81,
      height:32,
      name: gateName,
      id: "gate" + UID.next()
    })
  }

  return {
    load: loadResources,
    newImage: getNewImage,
    gates: gateNames,
  }
})
