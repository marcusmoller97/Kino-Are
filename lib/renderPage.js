import { marked } from 'marked';
import { loadMovie, loadMovies } from '../src/backendJs/apiMovies.js';

const MENU = [
    {
        label: 'Home',
        id: 'home',
        link: '/',
    },
    {
        label: 'Movies',
        id: 'movies',
        link: '/movies',
    },
    {
        //place at bottom
        label: 'Movie',
        id: 'movie',
        link: '/movie',
    }
];

export async function renderPage (res, page) {
    res.render(page, {
        menuItems: MENU.map((item) => ({
            label: item.label,
            link: item.link,
            active: item.id == page,
        }))
    });
}

// Function to renderMoviesPage
export async function renderMoviesPage (res, page) {
    const movies = await loadMovies();

    res.render(page, {
        menuItems: MENU.map((item) => ({
            label: item.label,
            link: item.link,
            active: item.id == page,
        })),
        ...{ movies }
    });
}

export async function renderMovies (res, page, movies) {
    res.render(page, {
        menuItems: MENU.map((item) => ({
            label: item.label,
            link: item.link,
            active: item.id == page,
        })),
        ...{ movies }
    })
}

// Fucntion to render movie
export async function renderMoviePage (res, page, id) {

    const movie = await loadMovie(id);

    if (movie !== null) {
        //convert intro text to HTML with markdown
        movie.attributes.intro = marked(movie.attributes.intro);
    }

    res.render(page, {
        menuItems: MENU.map((item) => ({
            label: item.label,
            link: item.link,
            active: item.id == page,
        })),
        ...(page === 'movie' && { movie })
    });
}
