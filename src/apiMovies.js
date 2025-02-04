import fetch from 'node-fetch';

const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';

export async function loadMovies () {
    const res = await fetch(API_BASE + '/movies');

    const payload = await res.json();
    return payload.data;
}

export async function loadMovie (id) {
    const res = await fetch(API_BASE + '/movies/' + id);

    const payload = await res.json();
    return payload.data;
}

// Function to fetch reviews for a movie
export async function loadMovieReviews(movieId, page = 1, pageSize = 5) {
    try {
        const url = `${API_BASE}/reviews?filters[movie]=${movieId}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
        const res = await fetch(url);
        const payload = await res.json();
        return payload.data || [];
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return [];
    }
}

// Rating
export async function getAverageRating(movieId) {
    try {
        const reviews = await loadMovieReviews(movieId);
        if (reviews.length === 0) return "No ratings available";

        const ratings = reviews
            .map(review => review.attributes.rating)
            .filter(rating => rating > 0);

        if (ratings.length === 0) return "No valid ratings available";

        // Calculate the average rating
        const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;

        return average.toFixed(1); 
    } catch (error) {
        console.error("Error calculating average rating:", error);
        return "Error fetching rating";
    }
}



