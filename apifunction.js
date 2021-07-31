var youtubeRating = document.querySelector('#resultDiv1')
var omdbRating = document.querySelector('#resultDiv2')



var getMovieName = function() {
    var queryString = document.location.search 
    var movieName = queryString.split('=')[1]
    
    if (movieName) {

        accessApi(movieName)
    } else {
        document.location.replace('./index.html')
    }
};

var accessApi = function(movie) {
    accessYoutubeApi(movie);
    accessOmdbApi(movie);
}

function accessYoutubeApi(movie) {
    var apiUrl = 'https://youtube.googleapis.com/youtube/v3/search?q=' + movie +'trailer&key=AIzaSyBqHkvlD5nsvodOJY9d4qxuLEHUCg0u3zI'

    fetch(apiUrl)
    .then (function (response) {
        return response.json();
      })
      .then(function (data) {
        var trailer1 = (data.items[0].id.videoId);
        var likesUrl = 'https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id='+ trailer1 + '&key=AIzaSyBqHkvlD5nsvodOJY9d4qxuLEHUCg0u3zI'
        fetch(likesUrl)
        .then (function (response) {
            return response.json();
          })
          .then(function (data) {
              youtubeRating.textContent = (data.items[0].statistics.likeCount/data.items[0].statistics.dislikeCount).toFixed(2)
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

getMovieName()