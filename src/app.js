import express from 'express';
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
    /*.get('/movies/:id/rating', async (req, res) => {
            const rating = await loadMovieRatings(req.params.id);
            res.json({ movieId: req.params.id, rating });
        });*/

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