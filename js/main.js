import { movieCard } from "./movies.js";
import { movies } from "./getMovies.js";

const topThreeContainer = document.querySelector(".topThree");
const figureCard = document.querySelector("figure.movies");

if (topThreeContainer) {
  findTopThreeMovies();

  document.querySelector(".allMoviesBtn").addEventListener("click", function () {
    window.location.href = "movies";
  });
}

async function findTopThreeMovies() {
  const response = await fetch("/content/movies.json");
  const data = await response.json();
  const sortedMovies = data.sort((a, b) => b.rating - a.rating);
  const top = sortedMovies.slice(0, 3);

  if (topThreeContainer) {
    generateTopThree(top);
  }
}

//----function to generate top 3 movies from api----
function generateTopThree(movies) {
  if (!topThreeContainer) {
    console.error("Container .topThree not found");
    return;
  }

  topThreeContainer.innerHTML = `
    <div class="containerLeft">
      <img class="imgLeft" src="${movies[0].image}" alt="Image not found" />
      <div class="infoCard">
        <div class="info">
          <h3 class="movieName">${movies[0].title}</h3>
          <p class="movieInfo">${movies[0].genre}</p>
        </div>
         <button class="movieBtn">Buy ticket <i class="fa-solid fa-money-bill-1-wave"></i></button>
      </div>
    </div>
    <div class="containerRight">
      <div class="movieCardTop">
        <img class="imgTop" src="${movies[1].image}" alt="Image not found" />
        <div class="infoCard">
          <div class="info">
            <h3 class="movieName">${movies[1].title}</h3>
            <p class="movieInfo">${movies[1].genre}</p>
          </div>
          <button class="movieBtn">Buy ticket <i class="fa-solid fa-money-bill-1-wave"></i></button>
        </div>
      </div>
      <div class="movieCardBottom">
        <img class="imgBottom" src="${movies[2].image}" alt="Image not found" />
        <div class="infoCard">
          <div class="info">
            <h3 class="movieName">${movies[2].title}</h3>
            <p class="movieInfo">${movies[2].genre}</p>
          </div>
          <button class="movieBtn">Buy ticket <i class="fa-solid fa-money-bill-1-wave"></i></button>
        </div>
      </div>
    </div>
  `;
}
