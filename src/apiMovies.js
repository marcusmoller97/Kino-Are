import fetch from 'node-fetch';

const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';

export async function loadMovies () {
    const res = await fetch(API_BASE + '/movies');

    if (!res.ok) {
        throw new Error('Failed to fetch movies: ', res.statusText);
    }
    const payload = await res.json();
    return payload.data;
}

export async function loadMovie (id) {
    const res = await fetch(API_BASE + '/movies/' + id);

    if (!res.ok) {
        throw new Error('Failed to fetch movies: ', res.statusText);
    }

    const payload = await res.json();
    return payload.data;
}
