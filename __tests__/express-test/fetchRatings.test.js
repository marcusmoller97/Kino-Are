import {
  describe,
  expect,
  it,
  jest,
  beforeEach,
  beforeAll,
} from "@jest/globals";
import { fetchImdbRatings, loadMovieRatings } from "../../src/ratings.js";

// Mock the ES module before importing it
await jest.unstable_mockModule("../../src/apiMovies.js", () => ({
  loadMovie: jest.fn(),
}));

// Import the mocked module
const apiMovies = await import("../../src/apiMovies.js");

// Mock global fetch
global.fetch = jest.fn();

// Disable `console.error` for all tests
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => { });
});

describe("fetchImdbRatings()", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock `loadMovie()` to return valid IMDb IDs
    apiMovies.loadMovie.mockImplementation(async (movieId) => {
      if (movieId === "wrongId") {
        return { attributes: {} }; // Simulating missing IMDb ID
      }
      return { attributes: { imdbId: movieId } };
    });
  });

  it("should return IMDb rating if API responds correctly", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ averageRating: 7.9 }),
    });

    const result = await fetchImdbRatings("tt1234567");
    expect(result).toBe("7.90");
  });

  it('should return "No ratings available" if IMDb rating is missing', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    const result = await fetchImdbRatings("tt1234567");
    expect(result).toBe("No ratings available");
  });

  it('should return "No ratings available" if API request fails', async () => {
    global.fetch.mockRejectedValue(new Error("Network Error"));

    const result = await fetchImdbRatings("tt1234567");
    expect(result).toBe("No ratings available");
  });

  it("should handle missing IMDb ID gracefully", async () => {
    const result = await fetchImdbRatings("wrongId");
    expect(result).toBe("No ratings available");
  });
});

describe("Additional tests for loadMovieRatings()", () => {
  it("should compute average correctly when ratings include numeric strings", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          { attributes: { rating: 7 } },
          { attributes: { rating: "8" } }, // String that can be converted to number
          { attributes: { rating: 9 } },
          { attributes: { rating: 6 } },
          { attributes: { rating: 7 } },
        ],
      }),
    });
    const result = await loadMovieRatings("movie123");
    expect(result).toBe("7.40");
  });

  it('should return "No ratings available" if response JSON misses the data field', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        /* Missing "data" field */
      }),
    });
    const result = await loadMovieRatings("movie123");
    expect(result).toBe("No ratings available");
  });

  it('should return "No ratings available" if fetch response ok is false', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ data: [] }),
    });
    const result = await loadMovieRatings("movie123");
    expect(result).toBe("No ratings available");
  });
});

describe("Additional tests for fetchImdbRatings()", () => {
  it('should return "No ratings available" if JSON parsing fails in fetchImdbRatings', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        throw new Error("Invalid JSON");
      },
    });
    const result = await fetchImdbRatings("tt1234567");
    expect(result).toBe("No ratings available");
  });

  it('should return "No ratings available" if averageRating is non-numeric', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ averageRating: "NaN" }),
    });
    const result = await fetchImdbRatings("tt1234567");
    expect(result).toBe("No ratings available");
  });
});