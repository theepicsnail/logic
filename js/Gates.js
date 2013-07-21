define(["Resources"], function(R) {
  public = {}

  public.newGate = function(type) {
    return R.newImage(type)
  }

  return public;
});
