document.querySelector('.allMoviesBtn').addEventListener('click', function () {
  window.location.href = 'movies';
});

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

    });

    console.log(movies);
  } catch (error) {
    console.error('Error fetching: ', error);
  }
});
