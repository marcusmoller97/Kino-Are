import express from 'express';
import { renderMovies, renderPage, renderMoviesPage, renderMoviePage } from '../lib/renderPage.js';
import { errorHandler } from '../lib/middleware.js';
// import { getKikoContent } from '../lib/kiko.js';

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
        .get('/kiko', async (_req, res) => {
            // const kikoContent = await getKikoContent();
            renderPage(res, 'kiko');
        })
        .get('/review', async (_req, res) => {
            // const reviewContent = await getReviewContent();
            renderPage(res, 'review');
        })
        .get('/api/kikoContent', async (_req, res) => {
            // Replace with actual content fetching logic
            const kikoContent = { message: "Dynamic content loaded" };
            res.json(kikoContent);
        })
        .get('/api/reviewContent', async (_req, res) => {
            // Replace with actual content fetching logic
            const reviewContent = { message: "Dynamic content loaded" };
            res.json(reviewContent);
        });

    app
        .use('/static', express.static('./static'))
        .use('/pictures', express.static('./pictures'))
        .use('/content', express.static('./content'))
        .use('/js', express.static('./public')); // Ensure this line is correct

    app.all('*', (_req, res) => {
        res.status(404);
        const status = res.statusCode;
        res.render("404", { status });
    });

    app.use(errorHandler);

    return app;
}

export default initApp;
