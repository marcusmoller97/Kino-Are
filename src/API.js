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
  })
  .post('/movies/review', async (req, res) => {
  const reviewData = req.body;
  console.log("Mottagen data:", req.body);

  try {
    const response = await fetch('https://plankton-app-xhkom.ondigitalocean.app/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error sending review:', error);
    res.status(500).json({ message: 'Failed to submit review' });
  }
});

export { router as apiRouter };
