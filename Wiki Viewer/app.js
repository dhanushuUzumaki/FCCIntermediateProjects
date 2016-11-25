(function()
{
  var app = angular.module('WikiViewer',[]);

  app.controller("WikiController",['$http',function($http){
    var wiki = this;
    this.searchText = "";
    this.articles = [];
    this.searching = false;
    this.noResultsFound = false;
    this.search = function()
    {
      wiki.searching = true;
      wiki.noResultsFound = false;
      wiki.articles = []
      getData();
    }
    var getData = function(){
      $http.get("http://en.wikipedia.org/w/api.php?format=json&action=query&"+
      "generator=search&prop=pageinfo|extracts&exintro&explaintext&"+
      "exsentences=1&exlimit=max&gsrsearch="+wiki.searchText+"&format=json").success(function(data){
      if(data.hasOwnProperty("query"))
      {
        wiki.articles = data.query.pages;
        wiki.noResultsFound = false;
      }
      else{
        wiki.noResultsFound = true;
      }
      wiki.searching = false;
    })}
  } ]);
})();
