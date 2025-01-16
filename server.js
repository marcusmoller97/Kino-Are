import express from 'express';

const app = express();
const PORT = 5080;

app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/', (req, res) => {

    const payload = {
        pageTitle: 'Kino home'
    };

    res.status(200).render('home', payload);
});

app.get('/index.html', (req, res) => {
    res.status(200).render('home');
});

app.get('/moviesPage.html', (req, res) => {
    const payload = {
        pageTitle: 'Kino movies'
    };
    res.status(200).render('movies', payload);
});

app.use('/pictures', express.static('./pictures'));
app.use('/static', express.static('./static'));
app.use('/js', express.static('./js'));


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Server is running on: http://localhost:${PORT}/`);
});
