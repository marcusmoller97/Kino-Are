import { movieCard } from "./movies.js";
import { movies } from "./getMovies.js";
//import { sortScreenings } from '../src/screenings.js';
// to decide where movieCards should be appended
const figureCard = document.querySelector("figure.movies");

// create cards from all the elements in an array.
//movieCard.createMovieCardsFromArray(array, figureCard);
// opens movie modal box from movie card.
//movieCard.clickEventMovieModal(array);

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

findTopThreeMovies();
/* showAllMovies(); */

document.querySelector(".allMoviesBtn").addEventListener("click", function () {
    window.location.href = "movies";
});



/* async function showAllMovies () {
    console.log("In all movies");
    const releasedArray = [];
    const response = await fetch("content/movies.json");
    const data = await response.json();
    movieCard.createMovieCardsFromArray(data, figureCard);
    movieCard.clickEventMovieModal(data);
} */

async function findTopThreeMovies () {
    const releasedArray = [];
    const response = await fetch("content/movies.json");
    const data = await response.json();
    data.forEach((element) => {
        if (!element.comingSoon) {
            releasedArray.push(element);
        }
    });
    releasedArray.sort((a, b) => b.rating - a.rating);
    let topThreeMovies = [];
    for (let i = 0; i < 3; i++) {
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
showUpcomingScreenings();

async function showUpcomingScreenings(){
    const response = await fetch("/api/screenings/upcomingScreenings");
    const screenings = await response.json();

    const screeningsWrapper = document.querySelector(".upcomingScreenings");

    if(screenings.length == 0){
        screeningsWrapper.innerHTML = "Vi har tyvärr inga visningar de kommande 5 dagarna";
    }else{
        const screeningsListTitle = document.createElement("ul");
        screeningsListTitle.classList.add("screeningsTitle");
        const screeningsListDate = document.createElement("ul");
        screeningsListDate.classList.add("screeningsDate");
        const screeningsListTime = document.createElement("ul");
        screeningsListTime.classList.add("screeningsTime");

        screeningsWrapper.append(screeningsListTitle);
        screeningsWrapper.append(screeningsListDate);
        screeningsWrapper.append(screeningsListTime);

        const listTitle = document.createElement("li");
        listTitle.classList.add("screeningsListTitle");
        listTitle.innerHTML = "Titel: ";

        const listDate = document.createElement("li");
        listDate.classList.add("screeningsListDate");
        listDate.innerHTML = "Datum: ";

        const listTime = document.createElement("li");
        listTime.classList.add("screeningsListTime");
        listTime.innerHTML = "Tid: ";

        screeningsListTitle.append(listTitle);
        screeningsListDate.append(listDate)
        screeningsListTime.append(listTime);

        screenings.forEach((screening)=>{
            const title = screening.movie.data.attributes.title;
            const d = new Date(screening.start_time);
            const date = d.toLocaleDateString("en-GB");
            const time = d.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});

            const listItemTitle = document.createElement("li");
            listItemTitle.classList.add("screeningsListItem");
            listItemTitle.innerHTML = title;
        

            const listItemDate = document.createElement("li");
            listItemDate.classList.add("screeningsListItem");
            listItemDate.innerHTML = date;
       
        
            const listItemTime = document.createElement("li");
            listItemTime.classList.add("screeningsListItem");
            listItemTime.innerHTML = time;

            screeningsListTitle.append(listItemTitle);
            screeningsListDate.append(listItemDate);
            screeningsListTime.append(listItemTime);
         })
    }
    
}


