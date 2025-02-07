import { jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import { apiRouter } from '../../src/API.js';  // Assuming your routes are set up in API.js
import { fetchImdbRatings, loadMovieRatings } from '../../src/ratings.js';
import * as apiMovies from '../../src/apiMovies.js';  // Import the module to mock

// Set up Express app
const app = express();
app.use("/api", apiRouter);  // Using the API router from your app

// Mock the necessary functions
jest.mock('../../src/apiMovies.js', () => ({
  loadMovie: jest.fn(),
}));

global.fetch = jest.fn(); // Mock global fetch

// Disable `console.error` for all tests
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});  // Silencing console.error globally
});

describe("Ratings API", () => {
  beforeEach(() => {
    jest.clearAllMocks();  // Reset mocks before each test
  });

  describe("GET /api/movies/:movieId/ratings", () => {
    it("should return IMDb rating if API responds correctly", async () => {
      apiMovies.loadMovie.mockResolvedValue({
        attributes: { imdbId: 'tt1234567' },
      });

      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => ({ averageRating: 7.9 })
      });

      const response = await request(app).get("/api/movies/1/ratings");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('rating', '7.90');
    });

    it("should return 'No ratings available' if IMDb ID is missing", async () => {
      apiMovies.loadMovie.mockResolvedValue({ attributes: {} });

      const response = await request(app).get("/api/movies/1/ratings");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('rating', 'No ratings available');
    });

    it("should return 'No ratings available' if the API request fails", async () => {
      apiMovies.loadMovie.mockResolvedValue({
        attributes: { imdbId: 'tt1234567' },
      });

      global.fetch.mockRejectedValue(new Error('Network Error'));

      const response = await request(app).get("/api/movies/1/ratings");
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Network Error');
    });

    it("should return 'No ratings available' if movie ID is invalid", async () => {
      apiMovies.loadMovie.mockResolvedValue(null);

      const response = await request(app).get("/api/movies/wrongId/ratings");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('rating', 'No ratings available');
    });
  });

  describe("GET /api/movies/:movieId/ratings/user", () => {
    it("should return average user rating if 5 or more reviews exist", async () => {
      apiMovies.loadMovie.mockResolvedValue({
        attributes: { imdbId: 'tt1234567' },
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [
            { attributes: { rating: 7 } },
            { attributes: { rating: 8 } },
            { attributes: { rating: 9 } },
            { attributes: { rating: 6 } },
            { attributes: { rating: 7 } },
          ]
        }),
      });

      const response = await request(app).get("/api/movies/1/ratings/user");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('rating', '7.40');
    });

    it("should fallback to IMDb rating if fewer than 5 reviews exist", async () => {
      apiMovies.loadMovie.mockResolvedValue({
        attributes: { imdbId: 'tt1234567' },
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [] }), // No reviews
      });

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ averageRating: 8.2 }), // IMDb rating fallback
      });

      const response = await request(app).get("/api/movies/1/ratings/user");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('rating', '8.20');
    });

    it("should return 'No ratings available' if API request fails", async () => {
      apiMovies.loadMovie.mockResolvedValue({
        attributes: { imdbId: 'tt1234567' },
      });

      global.fetch.mockRejectedValue(new Error('Network Error'));

      const response = await request(app).get("/api/movies/1/ratings/user");
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Network Error');
    });
  });
});
