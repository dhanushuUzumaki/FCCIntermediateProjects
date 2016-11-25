(function()
{
  var app = angular.module('TwitchTv',[]);
  app.controller("TwitchController",['$http',function($http){
    var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","burnofin"];
    var twitch = this;
    this.users = [];
    this.isOnline = function(user)
    {
      return user.user.presence == "Online";
    }
    this.isOffline = function(user)
    {
      return user.user.presence == "Offline";
    }
    this.isClosed = function(user)
    {
      return user.user.presence == "Account Closed";
    }
    streamers.forEach(function(stream){
      var presence;
      var playing;
      var status;
      var logo;
      var name;
      var link;
      $http.get("https://api.twitch.tv/kraken/streams/"+stream).then(function(data)
      {
        if(data.data.stream === null)
        {
          presence = "Offline";
          playing = "Unavailable";
        }
        else
          {
            playing = data.data.stream.game;
            presence = "Online"
          }
        $http.get("https://api.twitch.tv/kraken/channels/"+stream).success(function(data)
        {
          logo = data.logo != null ? data.logo : "http://blog.ramboll.com/fehmarnbelt/wp-content/themes/ramboll2/images/profile-img.jpg";
          name = data.display_name != null ? data.display_name : stream;
          status = presence == "Online" ? data.status : "";
          link = data.url;
          var user = {
            "name" : name,
            "presence" : presence,
            "playing" : playing,
            "status" : status,
            "logo" : logo,
            "link" : link
          };
          twitch.users.push(user);
        });
      },
    function(data){
      var user = {
        "name" : stream,
        "presence" : "Account Closed",
        "playing" : "Unavaliable",
        "status" : "",
        "logo" : "http://blog.ramboll.com/fehmarnbelt/wp-content/themes/ramboll2/images/profile-img.jpg",
        "link" : "http://www.twitch.tv"
      };
      twitch.users.push(user);
    });
  });
  }])

})();
