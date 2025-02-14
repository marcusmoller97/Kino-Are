# Kino-Are

* To run moviesJestTest.spec.js change **testEnvironment** to __jsdom__

# API documentation
## Reviews
* GET-request reviews/top-movies
  * Ska hämta reviews med filminformation. Manipulera informationen och returnera de filmer med bäst betyg top 5.
* POST-request reviews/:id/send
  * Ska skicka reviews med betyg från användaren.
* GET-request reviews/:id?side=sidnummer
  * Ska hämta 5 reviews per film per sida.
  * Klickbar per sida (5 reviews).
## Screening
* GET-request screening/upcoming
  * Kunna hämta efter film och kommande visningar (max 10 screenings på startsida).
* GET-request screening/upcoming/:id
  * Kunna hämta information om de kommande filmvisningar om en film.
## Rating
* GET-request movies/:id/rating
  * kunna hämta betyg på filmerna antingen från den angivna APi eller från IMDB om det inte finns tillräckligt med reviews.
## Reviews
- GET /api/movies/:movieId/reviews?page=1&pageSize=5
  Returns up to 5 verified reviews per page. Responds with 404 if no reviews are found.
# Server web url
* **https://kino-are.onrender.com**
