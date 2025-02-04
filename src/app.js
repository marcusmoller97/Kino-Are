import express from 'express';
import { fetchUpcomingScreenings } from './screenings.js';
import {
  renderMovies,
  renderPage,
  renderMoviePage,
} from '../lib/renderPage.js';
import { errorHandler } from '../lib/middleware.js';
import { apiRouter } from './API.js';

function initApp(API) {
  const app = express();

  app.set('view engine', 'pug').set('views', 'views');

  app
    .get('/', (_req, res) => {
      renderPage(res, 'home');
    })
    .get('/home', (_req, res) => {
      renderPage(res, 'home');
    })
    .get('/movies', async (_req, res) => {
      /* renderMoviesPage(res, 'movies'); */ //without sending param API
      const movies = await API;
      renderMovies(res, 'movies', movies);
    })
    .get('/movies/:id', async (req, res) => {
      renderMoviePage(res, 'movie', req.params.id);
        })
        .get('/api/screenings/upcomingScreenings', async (req, res) => {
            console.log("In app.js");
            const screenings = await fetchUpcomingScreenings();
            //console.log(screenings);
            res.send(screenings);

    });

  app
    .use(express.json())
    .use(apiRouter)
    .use('/static', express.static('./static'))
    .use('/pictures', express.static('./pictures'))
    .use('/content', express.static('./content'))
    .use('/js', express.static('./js'));

  app.all('*', (_req, res) => {
    res.status(404);
    const status = res.statusCode;
    res.render('404', { status });
  });

  app.use(errorHandler);

  return app;
}

export default initApp;
