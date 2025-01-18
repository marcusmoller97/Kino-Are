import fs from 'fs/promises';
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
    }
];

export default async function renderPage (response, page) {
    const isMoviePage = page == 'movies';
    let movies = [];

    if (isMoviePage) {
        try {
            movies = await loadMovies();
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
        ...(page === 'movies' && {movies })
    });
}
