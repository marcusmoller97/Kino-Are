import express from 'express';
import { upcomingScreenings, fetchScreeningsMovie } from './fetchScreening.js';
import reviewUtils from './reviewUtils.js';

const router = express();

router
  .get('/top-movies', async (_req, res) => {
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

      let payload = await fetchScreeningsMovie(movieId);
      payload = upcomingScreenings(payload);
      res.send(payload);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  });

export { router as apiRouter };
