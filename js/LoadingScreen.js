/*global define*/
"use strict";

/*
 * The loading screen acts as a small initial "app" while the full app (App.js)
 * is loading. This module is loaded initially, and should load as quickly as 
 * possible. Once the app has finished loading, this is removed and never seen 
 * again.
 */
define(["Stage", "Kinetic"], function (Stage, Kinetic) {
  var layer = new Kinetic.Layer(), //Layer that holds all the loading content
    loadingText,          //Animated text object that stores "loading"
    loadingAnim;          //The animation that occilates the opacity

  /*
   * Called before the app starts loading anything, this should quickly place
   * the loading screen in the stage, and be visible to the user.
   */
  function startLoading() {
    Stage.add(layer);

    loadingText = new Kinetic.Text({
      x: 0,
      y: 20,
      text: "Loading",
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: 'black'
    });
    layer.add(loadingText);

    loadingAnim = new Kinetic.Animation(function (frame) {
      loadingText.setOpacity(0.7 + 0.3 * Math.sin(frame.time * 0.005));
      loadingText.setPosition(
        Stage.getWidth() / 2 - 60,
        Stage.getHeight() / 2 - 23
      );
    }, layer);
    loadingAnim.start();
  }

  /*
   * Once the loading has been completed, this is called. It serves to clean up
   * the stage to prepare for the app to get placed onto the stage.
   */
  function stopLoading() {
    loadingAnim.stop();
    layer.destroy();
  }

  /*
   * public exports
   */
  return {
    start: startLoading,
    stop: stopLoading
  };
});
