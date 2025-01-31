import express from 'express';
import { upcomingScreenings, fetchScreeningsMovie } from './fetchScreening.js';

const router = express();


router.get('/screenings/upcoming/:id', async (req, res) => {
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
