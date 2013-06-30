window.SoundStorm = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new SoundStorm.Routers.Router($("#content"));
    Backbone.history.start();
  }
};

$(document).ready(function(){
  SoundStorm.initialize();
});
