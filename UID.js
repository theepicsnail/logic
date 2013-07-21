define(function() {
  var ID = 1;
  return {next: function() {
    return ID++
  }};
});
