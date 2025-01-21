import express from 'express';
import { renderPage, renderMoviesPage, renderMoviePage } from './lib/renderPage.js';
import { errorHandler }  from  './lib/middleware.js';

export default async function initApp () {

    const app = express();

    app
        .set('view engine', 'pug')
        .set('views', 'views');

    app
        .get('/', (_req, res) => {
            res.status(200);
            renderPage(res, 'home');
        })
        .get('/home', (_req, res) => {
            res.status(200);
            renderPage(res, 'home');
        })
        .get('/movies', async (_req, res) => {
            res.status(200);
            renderMoviesPage(res, 'movies');
        })
        .get('/movies/:id', async (req, res) => {
            res.status(200);
            renderMoviePage(res, 'movie', req.params.id);
        })
        .use('/static', express.static('./static'))
        .use('/pictures', express.static('./pictures'))
        .use('/content', express.static('./content'))
        .use('/js', express.static('./js'))
        .use(errorHandler);

    app.all('*', (_req, res) => {
        res.status(404);
        const status = res.statusCode;
        res.render("404", { status });
    });

    return app;
}
