/*global require*/
"use strict";

/*
 * Main launcher, called from require.js and the index.html, this starts
 * off the loading process, and upon load complete, launches the app.
 */
require.config({
  baseUrl: "js"
});

require(["LoadingScreen", "Resources", "App"],
  function (LoadingScreen,   Resources,   App) {
    LoadingScreen.start();
    Resources.load(function () {
      App.load();
      LoadingScreen.stop();
      App.start();
    });
  });

