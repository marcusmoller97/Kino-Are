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

export default async function renderPage (response, page, id = null) {
    const isMoviePage = page == 'movies';
    let movies = [];

    if (isMoviePage || page === 'movie') {
        try {
            if (id === null) {
                movies = await loadMovies();
            } else {
                movies = await loadMovie(id);

                //convert intro text to HTML wiht markdown
                if (movies.attributes && movies.attributes.intro) {
                    movies.attributes.intro = marked(movies.attributes.intro);
                }
            }
            console.log(movies)
        } catch (error) {
            console.error('Error loading movies:', error);
        }
    }

    response.render(page, {
        menuItems: MENU.map((item) => ({
            label: item.label,
            link: item.link,
            active: item.id == page,
        })),
        ...(page === 'movies' && { movies }),
        ...(page === 'movie' && { movies })
    });
}
