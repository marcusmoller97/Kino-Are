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
    console.log("fetched screenings:");
    console.log(screenings);
}
/*const fakeScreenings = [ {
    id: 111,
    start_time: '2025-02-13',
    room: 'Stora salongen',
    createdAt: '2025-01-02'
},
{
    id: 112,
    start_time: '2025-02-01',
    room: 'Stora salongen',
    createdAt: '2025-01-02'
},
{
    id: 113,
    start_time: '2025-02-03',
    room: 'Stora salongen',
    createdAt: '2025-01-02'
},
{
    id: 114,
    start_time: '2025-01-13',
    room: 'Stora salongen',
    createdAt: '2025-01-02'
}
];


const array = sortScreenings(fakeScreenings);
console.log(array);*/
