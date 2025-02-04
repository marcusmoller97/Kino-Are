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
