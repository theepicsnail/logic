require(["LoadingScreen", "Resources", "App"], 
function( LoadingScreen,   Resources,   App){
  LoadingScreen.start()
  Resources.load(function() {
    App.load()
    LoadingScreen.stop()
    App.start()
  })
});

