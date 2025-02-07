import { describe, expect, it, jest, beforeEach, beforeAll } from '@jest/globals';
import { fetchImdbRatings, loadMovieRatings } from '../../src/ratings.js';

// Mock the ES module before importing it
await jest.unstable_mockModule('../../src/apiMovies.js', () => ({
    loadMovie: jest.fn()
}));

// Import the mocked module
const apiMovies = await import('../../src/apiMovies.js');

// Mock global fetch
global.fetch = jest.fn();

// Disable `console.error` for all tests
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('fetchImdbRatings()', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test

        // Mock `loadMovie()` to return valid IMDb IDs
        apiMovies.loadMovie.mockImplementation(async (movieId) => {
            if (movieId === 'wrongId') {
                return { attributes: {} }; // Simulating missing IMDb ID
            }
            return { attributes: { imdbId: movieId } };
        });
    });

    it('should return IMDb rating if API responds correctly', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ averageRating: 7.9 })
        });

        const result = await fetchImdbRatings('tt1234567');
        expect(result).toBe('7.90');
    });

    it('should return "No ratings available" if IMDb rating is missing', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({}) // Empty JSON response
        });

        const result = await fetchImdbRatings('tt1234567');
        expect(result).toBe('No ratings available');
    });

    it('should return "No ratings available" if API request fails', async () => {
        global.fetch.mockRejectedValue(new Error('Network Error'));

        const result = await fetchImdbRatings('tt1234567');
        expect(result).toBe('No ratings available');
    });

    it('should handle missing IMDb ID gracefully', async () => {
        const result = await fetchImdbRatings('wrongId');
        expect(result).toBe('No ratings available');
    });
});

describe('loadMovieRatings()', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        // Mock `loadMovie()` to return a valid IMDb ID
        apiMovies.loadMovie.mockImplementation(async (movieId) => {
            return { attributes: { imdbId: 'tt1234567' } };
        });
    });

    it('should return average user rating if 5 or more reviews exist', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                data: [
                    { attributes: { rating: 7 } },
                    { attributes: { rating: 8 } },
                    { attributes: { rating: 9 } },
                    { attributes: { rating: 6 } },
                    { attributes: { rating: 7 } }
                ]
            })
        });

        const result = await loadMovieRatings('movie123');
        expect(result).toBe('7.40');
    });

    it('should fallback to IMDb rating if fewer than 5 reviews exist', async () => {
        global.fetch
            .mockResolvedValueOnce({ ok: true, json: async () => ({ data: [] }) }) // No user reviews
            .mockResolvedValueOnce({ ok: true, json: async () => ({ averageRating: 8.2 }) }); // IMDb rating

        const result = await loadMovieRatings('movie123');
        expect(result).toBe('8.20');
    });

    it('should return "No ratings available" if API request fails', async () => {
        global.fetch.mockRejectedValue(new Error('Network Error'));

        const result = await loadMovieRatings('movie123');
        expect(result).toBe('No ratings available');
    });
});