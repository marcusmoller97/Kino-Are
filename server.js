import express from 'express';
import renderPage from './lib/renderPage.js';
import { loadMovies, loadMovie } from './src/apiMovies.js';

const app = express();
const PORT = 5080;

app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/', (req, res) => {
    renderPage(res, 'home')
});

app.get('/home', (req, res) => {
    renderPage(res, 'home');
});

app.get('/movies', async (req, res) => {
    
    renderPage(res, 'movies')
    /* res.render('movies') */
});

app.get('/movies/:id', async (req, res) => {
    console.log(req.params.id)
    /* const movie = await loadMovie(req.params.id) */
    renderPage(res, 'movie', req.params.id)
})

app.use('/static', express.static('./static'));
app.use('/pictures', express.static('./pictures'));
app.use('/content', express.static('./content'));
app.use('/js', express.static('./js'));


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Server is running on: http://localhost:${PORT}/`);
});

//TODO:
//Fix so js code and css code loads page movie after this code:
//app.get('/movies/:id', async (req, res) => {
//console.log(req.params.id);
//renderPage(res, 'movie', req.params.id)
//})
//TODO: Filmernas intro-text ska renderas med hjälp av “markdown” för formatering Maybe done!
//TODO: När användare besöker en filmsida som inte existerar ska en felsida visas och servern svara med korrekt HTTP-status, TODO: ett integrationstest bekräftar att detta fungerar
//TODO: Det ska finnas ett integrationstest som verifierar att filmsidor visar rätt titel
//TODO: 
