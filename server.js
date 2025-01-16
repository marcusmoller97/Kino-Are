import express from 'express';
import renderPage from './lib/renderPage.js';

const app = express();
const PORT = 5080;

app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/', (req, res) => {
    renderPage(res, 'home')
});

app.get('/index.html', (req, res) => {
    renderPage(res, 'home');
});

app.get('/moviesPage.html', (req, res) => {
    renderPage(res, 'movies')
});

app.use('/pictures', express.static('./pictures'));
app.use('/static', express.static('./static'));
app.use('/js', express.static('./js'));


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Server is running on: http://localhost:${PORT}/`);
});
