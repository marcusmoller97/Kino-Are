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
        })
        .get('/api/reviewContent', async (_req, res) => {
            const reviewContent = { message: "Dynamic content loaded" };
            res.json(reviewContent);
        });
    app
        .use('/static', express.static('./static'))
        .use('/pictures', express.static('./pictures'))
        .use('/content', express.static('./content'))
        .use('/js', express.static('./public'));

    app.all('*', (_req, res) => {
        res.status(404);
        const status = res.statusCode;
        res.render("404", { status });
    });

    app.use(errorHandler);

    return app;
}

export default initApp;
