import fs from 'fs/promises';
import { marked } from 'marked';
import { loadMovie, loadMovies } from '../src/apiMovies.js';

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

export async function renderPage (response, page, id = null) {
    response.render(page, {
        menuItems: MENU.map((item) => ({
            label: item.label,
            link: item.link,
            active: item.id == page,
        }))
    });
}

// Function to renderMoviesPage
export async function renderMoviesPage (response, page) {
    const movies = await loadMovies();

    response.render(page, {
        menuItems: MENU.map((item) => ({
            label: item.label,
            link: item.link,
            active: item.id == page,
        })),
        ...{ movies }
    });
}

// Fucntion to render movie
export async function renderMoviePage (response, page, id) {

    const movie = await loadMovie(id);

    if (movie !== null) {
        //convert intro text to HTML with markdown
        movie.attributes.intro = marked(movie.attributes.intro);
    }

    response.render(page, {
        menuItems: MENU.map((item) => ({
            label: item.label,
            link: item.link,
            active: item.id == page,
        })),
        ...(page === 'movie' && { movie })
    });
}
