import { movieCard } from './movies.js';
import { movies } from './getMovies.js';

// to decide where movieCards should be appended
const figureCard = document.querySelector('figure.movies');

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

document.querySelector('.allMoviesBtn').addEventListener('click', function () {
  window.location.href = 'movies';
});

console.log('hej');

addEventListener('DOMContentLoaded', async () => {
  // main container to append movieCards to
  const container = document.querySelector('.cardContainer');

  try {
    const response = await fetch('/top-movies');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const movies = await response.json();

    movies.forEach((movies) => {
      // div to href movie to correct moviepage.
      const movieCard = document.createElement('a');
      movieCard.href = `movies/${movies.id}`;
      movieCard.classList.add('movieCard');

      // create img
      const moviesImg = document.createElement('img');
      moviesImg.src = `${movies.picture}`;
      moviesImg.classList.add('moviesImg');

      // div containing movie name and average rating
      const cardInfo = document.createElement('div');
      cardInfo.classList.add('cardInfo');

      // title element for movie
      const moviesName = document.createElement('h2');
      moviesName.classList.add('moviesName');
      moviesName.innerText = movies.title;

      // div to contain averagerating and star
      const divRating = document.createElement('div');
      divRating.classList.add('ratingTextReviews');

      // stars
      const fontStar = document.createElement('i');
      fontStar.classList.add('fa-regular', 'fa-star');

      // rating text
      const averageRating = document.createElement('p');
      averageRating.innerText = movies.averageRating;

      // append to divRating
      divRating.append(fontStar);
      divRating.append(averageRating);

      // button to cardInfo
      const movieBtn = document.createElement('button');
      movieBtn.classList.add('movieBtn');

      // span ele for button
      const span = document.createElement('span');
      span.classList.add('movieSpanBtn');
      span.innerText = 'Köp biljett';

      // create i ele for button
      const i = document.createElement('i');
      i.classList.add('fa-solid', 'fa-money-bill-wave');

      // append to btn
      movieBtn.append(span);
      movieBtn.append(i);

      // append to main container where moviecard should be.
      container.append(movieCard);
      movieCard.append(moviesImg);
      movieCard.append(cardInfo);
      cardInfo.append(divRating);
      cardInfo.append(moviesName);
      cardInfo.append(movieBtn);

      //TODO:
      //Append picture to movieCard img element
      //Append Title of movie to moviecard
      //Append Rating of movie to moviecard
      //Make this into a function and fix separation of concern
    });

    console.log(movies);
  } catch (error) {
    console.error('Error fetching: ', error);
  }
});

/* async function showAllMovies () {
    console.log("In all movies");
    const releasedArray = [];
    const response = await fetch("content/movies.json");
    const data = await response.json();
    movieCard.createMovieCardsFromArray(data, figureCard);
    movieCard.clickEventMovieModal(data);
} */

async function findTopThreeMovies() {
  const releasedArray = [];
  const response = await fetch('content/movies.json');
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
  const containerLeft = document.querySelector('.containerLeft');
  const containerRightTop = document.querySelector('.movieCardTop');
  const containerRightBottom = document.querySelector('.movieCardBottom');

  movieCard.createMovieCard(
    topThreeMovies[0].id,
    topThreeMovies[0].image,
    topThreeMovies[0].title,
    containerLeft
  );
  movieCard.createMovieCard(
    topThreeMovies[1].id,
    topThreeMovies[1].image,
    topThreeMovies[1].title,
    containerRightTop
  );
  movieCard.createMovieCard(
    topThreeMovies[2].id,
    topThreeMovies[2].image,
    topThreeMovies[2].title,
    containerRightBottom
  );
  movieCard.clickEventMovieModal(topThreeMovies);
}
