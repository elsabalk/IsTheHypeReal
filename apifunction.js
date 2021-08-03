var youtubeRating = document.querySelector('#rating')
var omdbRating = document.querySelector('#resultDiv2')
var youtubeLikes = document.querySelector('#likes')
var youtubeDislikes = document.querySelector('#dislikes')
var searchBtnEl = document.querySelector(".btn")
var inputTextboxEl = document.querySelector("#enterMovie")
var resultsEl= document.querySelector('#results')
var movieArray = [];
var homePageEl = document.querySelector('#mainPage')

var getMovieName = function() {
    var queryString = document.location.search 
    var movieName = queryString.split('=')[1]
    
    if (movieName) {

        accessApi(movieName)
        resultsEl.textContent = "Results for " + decodeURIComponent(movieName)
    } else {
        document.location.replace('./index.html')
    }
};

var accessApi = function(movie) {
    accessYoutubeApi(movie);
    accessOmdbApi(movie);
}

function accessYoutubeApi(movie) {
    var apiUrl = 'https://youtube.googleapis.com/youtube/v3/search?q=' + movie +'trailer&key=AIzaSyBNyaEr1P4aZrdJka0OcVHJA8sbF0Ihh7c'

    fetch(apiUrl)
    .then (function (response) {
        return response.json();
      })
      .then(function (data) {
        var trailer1 = (data.items[0].id.videoId);
        var likesUrl = 'https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id='+ trailer1 + '&key=AIzaSyBNyaEr1P4aZrdJka0OcVHJA8sbF0Ihh7c'
        fetch(likesUrl)
        .then (function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data.items[0].statistics.likeCount)
              youtubeRating.textContent = (data.items[0].statistics.likeCount/data.items[0].statistics.dislikeCount).toFixed(2) + " || Ratio of Likes to Dislikes"
              youtubeDislikes.textContent = data.items[0].statistics.dislikeCount + " || Dislikes"
              youtubeLikes.textContent = data.items[0].statistics.likeCount + " || Likes"
              })
      });  
}

function accessOmdbApi(movie) {
  var omdbUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=8650ffe7&t=' + movie

  fetch(omdbUrl)
  .then (function (response) {
    return response.json();
  })
  .then(function (data) {
    omdbRating.textContent = data.Ratings[0].Value
    
  })
}

function storeMovieValues() {
  localStorage.setItem("movies", JSON.stringify(movieArray));
}

//On page Load
function init() {

  // Get stored movie list from localStorage
  var storedMovies = JSON.parse(localStorage.getItem("movies"));

  // If movie was retrieved from localStorage, update the movie array to it
  if (storedMovies !== null) {
      movieArray = storedMovies;
  }

  // Show movies on the DOM
  //renderMovies();
}


searchBtnEl.addEventListener("click", function(event) {
  event.preventDefault();

  movieArray.push(inputFieldText);
    

  var inputFieldText = inputTextboxEl.value.trim();
  
  window.location.href = './second.html?movie='+ inputFieldText
})

homePageEl.addEventListener("click", function(event) {
  event.preventDefault();
  document.location.replace('./index.html')
})


init()

getMovieName()

