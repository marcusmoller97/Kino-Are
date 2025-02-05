import fetch from 'node-fetch';
import { API_BASE } from "../src/apiMovies.js";

// Function to fetch reviews for a movie
export async function loadMovieReviews(movieId) {
    const url = `${API_BASE}/reviews?filters[movie]=${movieId}`;
    const res = await fetch(url);
    const payload = await res.json();

    if (payload.data.length > 0) {
        // Extract ratings from the review objects
        const ratings = payload.data.map(review => review.attributes.rating);

        // Calculate the average rating
        const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
        const avgRating = (totalRating / ratings.length).toFixed(2); 

        return avgRating;
    }

    return "No ratings yet";
}