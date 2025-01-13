import { movieCard } from "./movies.js";
import { movies } from "./getMovies.js";

// to decide where movieCards should be appended
const figureCard = document.querySelector("figure.movies");

// reads json file to diffrent arrays in movie objects.
movies.getAllMovies();
movies.getReleasedMovies();
movies.getUpcomingMovies();

// makes the arrays from the object global
let allMovies = movies.allMovies;
console.log(allMovies);
let released = movies.released;
let upcoming = movies.upcoming;
console.log(released);
console.log(upcoming);


document.querySelector(".allMoviesBtn").addEventListener("click", function() {
    window.location.href = "moviesPage.html"; 
  });
  

findTopThreeMovies();


async function findTopThreeMovies(){
    const releasedArray = [];
    const response = await fetch("content/movies.json");
    const data = await response.json();
    data.forEach((element) => {
        if(!element.comingSoon){
            releasedArray.push(element);
        }
    })
    releasedArray.sort((a,b) => b.rating - a.rating);
    let topThreeMovies = [];
    for(let i=0; i<3;i++){
        topThreeMovies.push(releasedArray[i]);
        console.log(topThreeMovies.length + topThreeMovies[i].title);
    }
    const containerLeft = document.querySelector(".containerLeft");   
    const containerRightTop = document.querySelector(".movieCardTop"); 
    const containerRightBottom = document.querySelector(".movieCardBottom"); 

    movieCard.createMovieCard(topThreeMovies[0].id, topThreeMovies[0].image, topThreeMovies[0].title, containerLeft);
    movieCard.createMovieCard(topThreeMovies[1].id, topThreeMovies[1].image, topThreeMovies[1].title, containerRightTop);
    movieCard.createMovieCard(topThreeMovies[2].id, topThreeMovies[2].image, topThreeMovies[2].title, containerRightBottom);
    movieCard.clickEventMovieModal(topThreeMovies);
}

