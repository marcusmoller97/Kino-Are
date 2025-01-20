import express from 'express';
import renderPage from './lib/renderPage.js';
import {errorHandler}  from  './lib/middleware.js';

const app = express();
const PORT = 5080;

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
        renderPage(res, 'movies');
    })
    .get('/movies/:id', async (req, res) => {
        renderPage(res, 'movie', req.params.id);
    });

    
    app
    .use('/static', express.static('./static'))
    .use('/pictures', express.static('./pictures'))
    .use('/content', express.static('./content'))
    .use('/js', express.static('./js'))
    
app.all('*', (_req, res) => {
    res.status(404);
    const status = res.statusCode
    res.render("404", { status })
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Server is running on: http://localhost:${PORT}/`);
});

//TODO: När användare besöker en filmsida som inte existerar ska en felsida visas och servern svara med korrekt HTTP-status, TODO: ett integrationstest bekräftar att detta fungerar
//TODO: Det ska finnas ett integrationstest som verifierar att filmsidor visar rätt titel
//TODO: 
