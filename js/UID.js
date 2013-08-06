/*global define*/
"use strict";

/*
 * UID is a source of globally unique ID numbers.
 * This module is a singleton, with one function: next()
 */
define(function () {
  var ID = 0;
  return {next: function () {
    //Return a unique ID each call. 
    ID += 1;
    return ID;
  }};
});
