$(document).ready(function() {
  initialize();
  getquote();
})

var mycolors = ["#8C8585", "#30E38F", "#3C5066", "#5C52D1", "#A1885F", "#20E344"]
var initialize = function() {

  var i = Math.floor(Math.random() * mycolors.length);
  setcolors(mycolors[i]);
}
var currentQuote = '',
  currentAuthor = '';
var setcolors = function(clr) {
  document.getElementsByTagName("body")[0].style.background = clr;
  document.getElementById("author").style.color = clr;
  document.getElementsByClassName("quote")[0].style.color = clr;
  document.getElementById("tweet").style.background = clr;
  document.getElementById("new-quote").style.background = clr;
}

var getquote = function() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "qOGPMUlZEImshgmLwOYww0VQ3NkPp1hbFZkjsnvwFkALEQylGz",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function(response) {
      var r = JSON.parse(response);
      currentQuote = r.quote;
      currentAuthor = r.author;

      $(".quote").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          document.getElementById("text").innerHTML = r.quote;
        });

      $("#author").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          document.getElementById("author").innerHTML = r.author;
        });

      initialize();
      document.getElementById("tweet").href = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor);
    }
  });
}
