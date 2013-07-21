require(["LoadingScreen", "Resources", "App"], 
function( LoadingScreen,   Resources,   App){
  LoadingScreen.start()
  Resources.load(function() {
    LoadingScreen.stop()
    App.start()
  })
});

