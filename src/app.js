import express from 'express';
import { renderMovies, renderPage, renderMoviesPage, renderMoviePage } from '../lib/renderPage.js';
import { errorHandler } from '../lib/middleware.js';
import { upcomingScreenings, fetchScreeningsMovie } from './backendJs/fetchScreening.js';

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
        .get('/screenings/upcoming/:id', async (req, res) => {
            try {
                const movieId = req.params.id;
                console.log(movieId)

                let payload = await fetchScreeningsMovie(movieId);
                payload = upcomingScreenings(payload);
                res.send(payload);
            } catch (error) {
                console.error(error);
                res.status(500);
            }
        })


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
