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