window.SoundStorm = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new SoundStorm.Routers.app_router($("#content"));
    Backbone.history.start();
  }
};

$(document).ready(function(){
  SoundStorm.initialize();
});
