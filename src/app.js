import express from 'express';
import { renderMovies, renderPage, renderMoviesPage, renderMoviePage } from '../lib/renderPage.js';
import { errorHandler } from '../lib/middleware.js';

function initApp (API) {
    const app = express();

    app
        .set('view engine', 'pug')
        .set('views', 'views');

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
        });

       app.post('/movies/review', async (req, res) => { 
          const reviewData = req.body;
        
          try {
            const response = await fetch('https://plankton-app-xhkom.ondigitalocean.app/api/reviews', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(reviewData),
            });
        
            const data = await response.json();
            res.status(200).json(data);
          } catch (error) {
            console.error('Error sending review:', error);
            res.status(500).json({ message: 'Failed to submit review' });
          }
        });

    app
        .use('/static', express.static('./static'))
        .use('/pictures', express.static('./pictures'))
        .use('/content', express.static('./content'))
        .use('/js', express.static('./js'));


    app.all('*', (_req, res) => {
        res.status(404);
        const status = res.statusCode;
        res.render("404", { status });
    });

    app.use(errorHandler);
 
    return app;
}

export default initApp;
