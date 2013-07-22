define(["Kinetic", "Stage", "Toolbox", "Workspace", "ActiveLayer", "Anchor"],
function(K, S, T, W, A, Anchor){

  /*
  Load everything
  Wire everything
  */
  function load() {
    W.load()
    T.load()
    A.load()
    T.setOnGateCreatedCallback(A.addAndDragGate)
    A.setOnGateAdded(W.addGate)
    A.setOnAddOrDestroyConnection(W.addOrDestroyConnection)
    Anchor.prototype.anchorConnectionStart = A.anchorStart
  }

  function start() {
    //Bottom Layer
    S.add(W.getLayer())
    S.add(T.getLayer())
    S.add(A.getLayer())
    //Top layer
  }


  return {
    load: load,
    start:start
  }
})
