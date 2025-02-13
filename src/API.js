import express from "express";
import { upcomingScreenings, fetchScreeningsMovie } from "./fetchScreening.js";
import { fetchUpcomingScreenings } from "./screenings.js";
import reviewUtils from "./reviewUtils.js";
import { loadMovieRatings } from "./ratings.js";

const router = express();
router
  .get('/reviews/top-movies', async (_req, res) => {
    // fetch api
    try {
      await reviewUtils.fetchReviews();
      const validReviews = reviewUtils.fetchValidReviews();
      reviewUtils.fetchRecentReviews(validReviews);
      const movies = reviewUtils.getTop5Movies(reviewUtils.recentReviews);
      res.send(movies);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  })
  .get('/screenings/upcoming/:id', async (req, res) => {
    try {
        const movieId = req.params.id;

        // Fetch screenings for the movie
        let payload = await fetchScreeningsMovie(movieId);
        payload = upcomingScreenings(payload);

        // Send the screenings in the response
        res.send(payload);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
  })
  .get('/movies/:id/rating', async (req, res) => {
    try {
        const movieId = req.params.id;

        // Fetch ratings for the movie
        const rating = await loadMovieRatings(movieId);

        // Send the rating in the response
        res.send({ rating });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
  })

	//-----------cms endpoint------------
	.get("/movies/:movieId/reviews", async (req, res) => {
		try {
			const { movieId } = req.params;
			const { page = 1, pageSize = 5 } = req.query;

			//--------filters with cms compatible------
			const cmsUrl = new URL(
				"https://plankton-app-xhkom.ondigitalocean.app/api/reviews"
			);
			cmsUrl.searchParams.append("filters[movie][id][$eq]", movieId);
			cmsUrl.searchParams.append("pagination[page]", page);
			cmsUrl.searchParams.append("pagination[pageSize]", pageSize);
			cmsUrl.searchParams.append("populate", "movie");

			console.log("CMS URL--->", cmsUrl.toString());

			const response = await fetch(cmsUrl);
			if (!response.ok) {
				throw new Error(`CMS API Error: ${response.statusText}`);
			}
			const data = await response.json();
			//---se if the review exist---
			if (!data.data || data.data.length === 0) {
				return res
					.status(404)
					.json({ message: "This movie has no review yet!" });
			}
			res.json(data);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	})

  .post('/movies/review', async (req, res) => {
    const reviewData = req.body;
    console.log('Mottagen data:', req.body);

    try {
      const response = await fetch(
        'https://plankton-app-xhkom.ondigitalocean.app/api/reviews',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reviewData),
        }
      );

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error sending review:', error);
      res.status(500).json({ message: 'Failed to submit review' });
    }
  })
  .get('/screenings/upcoming', async (req, res) => {
    console.log('In app.js');
    const screenings = await fetchUpcomingScreenings();
    res.send(screenings);
  });
export { router as apiRouter };
