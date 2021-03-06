// Our fanshy scripts :3

var searchBtnEl = document.querySelector(".btn");
var inputTextboxEl = document.querySelector("#enterMovie");
var movieList = document.querySelector("li");
var classRowButton = document.querySelector("row");
var recentSearches = document.querySelector("recentSearchResults");
var mainPageButton = document.querySelector("mainPage");

var movieArray = [];

// This function reads all movies entered from the movie array
function renderMovies() {

  // building html structure based on array count
  for (var i = 0; i < movieArray.length; i++) {
    var movieValue = movieArray[i];
    console.log(movieValue);

    document.getElementById("recentSearchResults").classList.add("movies-container");
    let list = document.createElement("li");
    list.setAttribute("data-index", i);
    list.textContent = movieValue;
    list.classList.add("movies");
    document.getElementById("recentSearch").appendChild(list);
  }
}

// Set items based on key
function storeMovieValues() {
  // Stringify and set key in localStorage to movie array
  localStorage.setItem("movies", JSON.stringify(movieArray));
}

//On page Load
function init() {
  // Get stored movie list from localStorage
  var storedMovies = JSON.parse(localStorage.getItem("movies"));
  console.log("This is from init function :" + storedMovies);
  // If movie was retrieved from localStorage, update the movie array to it
  if (storedMovies !== null) {
    movieArray = storedMovies;
  }

  // Show movies on the DOM
  renderMovies();
}

// Once search icon is clicked trigger main method actions
searchBtnEl.addEventListener("click", function(event) {
  event.preventDefault();

  // Grabbing input text and assigining a variable
  var inputFieldText = inputTextboxEl.value.trim();
  console.log(inputFieldText);

  // Return from function early if submitted is blank
  if (inputFieldText === "") {
   alert("Please enter a movie")
  }

  // Add new movie to movie array, clear the input
  movieArray.push(inputFieldText);
  inputTextboxEl.value = "";

  console.log(movieArray);

  //Store updated movie in localStorage, re-render the list
  storeMovieValues();
  //renderMovies(); //*****Please help with where should I pin the recents searchs to */
  window.location.href = "./second.html?movie=" + inputFieldText;
});

init();
