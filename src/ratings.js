import fetch from 'node-fetch';
import { API_BASE } from "./apiMovies.js";

export async function fetchImdbRatings(imdbId) {
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
        const data = await response.text();

        if (data.rating) {
            return parseFloat(data.rating).toFixed(2); 
        } else {
            return null;
        }
    } catch (error) {
        console.error("Fel vid hämtning av IMDB-betyg:", error);
        return null;
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
