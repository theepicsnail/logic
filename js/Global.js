/*global define*/
"use strict";

function removeA(arr) {
  var what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length) {
    L -= 1;
    what = a[L];
    while ((ax = arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

function extend(child, base) {
  /*jslint forin: true*/
  var key;
  for (key in base.prototype) {
    if (child.prototype[key] === undefined) {
      child.prototype[key] = base.prototype[key];
    }
  }
  return child;
}
