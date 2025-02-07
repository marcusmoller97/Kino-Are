import { API_BASE } from "./apiMovies.js";

//------Function to fetch IMDb rating for a movie
export async function fetchImdbRatings(movieId) {
    if (!movieId) {
        console.error("Error: Movie ID is required to fetch IMDb rating.");
        return "No ratings available";
    }
    //------Dynamically import loadMovie to allow proper mocking in tests
    const { loadMovie } = await import("./apiMovies.js");
    const movie = await loadMovie(movieId);
    if (!movie || !movie.attributes?.imdbId) {
        console.error(`Error: No IMDb ID found for movie with ID: ${movieId}`);
        return "No ratings available";
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

        //-----Convert averageRating to a number and check if numeric
        const rating = Number(data.averageRating);
        return isNaN(rating) ? "No ratings available" : rating.toFixed(2);
    } catch (error) {
        console.error(`Error fetching IMDb rating for IMDb ID: ${imdbId}`, error);
        return "No ratings available";
    }
}

//-----Function to fetch reviews for a movie
export async function loadMovieRatings(movieId) {
    try {
        const url = `${API_BASE}/reviews?filters[movie]=${movieId}`;
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Failed to fetch reviews for movie ID: ${movieId}`);
        }

        const payload = await res.json();
        const reviews = Array.isArray(payload.data) ? payload.data : [];

        if (reviews.length >= 5) {
            //----Convert each rating to a numeral before summing
            const ratings = reviews.map(review => Number(review.attributes.rating));
            const avgRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
            return avgRating.toFixed(2);
        } else {
            return await fetchImdbRatings(movieId);
        }
    } catch (error) {
        console.error(`Error loading movie ratings for ${movieId}:`, error);
        return 'No ratings available';
    }
}