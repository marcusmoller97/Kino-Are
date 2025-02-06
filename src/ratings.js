import fetch from 'node-fetch';
import { API_BASE, loadMovie } from "./apiMovies.js";

// Function to fetch IMDb rating for a movie
export async function fetchImdbRatings(movieId) {
    if (!movieId) {
        console.error("Error: Movie ID is required to fetch IMDb rating.");
        return null;
    }
    const movie = await loadMovie(movieId);
    if (!movie || !movie.attributes?.imdbId) {
        console.error(`Error: No IMDb ID found for movie with ID: ${movieId}`);
        return null;
    }

    const imdbId = movie.attributes.imdbId;
    const url = `https://imdb236.p.rapidapi.com/imdb/${imdbId}/rating`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '3592379ec3mshf2c1bb2f6a37a60p1ce8fejsn9d18dc4c6545',
            'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        return data.averageRating ? parseFloat(data.averageRating).toFixed(2) : "No ratings available";
    } catch (error) {
        console.error(`Error fetching IMDb rating for IMDb ID: ${imdbId}`, error);
        return "No ratings available";
    }
}

// Function to fetch reviews for a movie
export async function loadMovieRatings(movieId) {
    const url = `${API_BASE}/reviews?filters[movie]=${movieId}`;
    const res = await fetch(url);
    const payload = await res.json();
    const reviews = Array.isArray(payload.data) ? payload.data : [];

    if (reviews.length >= 5) {
        const ratings = reviews.map(review => review.attributes.rating);
        const avgRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
        return avgRating.toFixed(2);
    } else {
        return await fetchImdbRatings(movieId);
    }
}
