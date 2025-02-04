import fetch from 'node-fetch';

const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';

export async function loadMovies() {
    const res = await fetch(API_BASE + '/movies');

    const payload = await res.json();
    return payload.data;
}

export async function loadMovie(id) {
    const res = await fetch(API_BASE + '/movies/' + id);

    const payload = await res.json();
    return payload.data;
}

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






