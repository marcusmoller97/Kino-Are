import { expect, test } from '@jest/globals';
import request from 'supertest';

import { loadMovies } from '../../src/apiMovies.js';
import initApp from '../../src/app.js';


test("Test that movies page contains the correct title inside it's browser.", async () => {
    const app = initApp(
        [
            {
                id: 8,
                attributes: {
                    title: 'Pulp Fiction',
                    imdbId: 'tt0110912',
                    intro: "In the realm of underworld, a series of incidents intertwines the lives of two Los Angeles mobsters, a gangster's wife, a boxer and two small-time criminals.",
                    image: [Object],
                    createdAt: '2024-01-22T09:24:08.098Z',
                    updatedAt: '2024-01-22T10:27:28.540Z',
                    publishedAt: '2024-01-22T09:24:10.979Z'
                }
            },
            {
                id: 9,
                attributes: {
                    title: 'Fire Walk With Me',
                    imdbId: 'tt0105665',
                    intro: "Laura Palmer's harrowing final days are chronicled one year after the murder of Teresa Banks, a resident of Twin Peaks' neighboring town.",
                    image: [Object],
                    createdAt: '2024-03-08T14:45:51.745Z',
                    updatedAt: '2025-01-15T09:55:10.071Z',
                    publishedAt: '2024-03-08T14:45:55.807Z'
                }
            },
            {
                id: 1,
                attributes: {
                    title: 'Isle of dogs',
                    imdbId: 'tt5104604',
                    intro: 'An outbreak of dog flu has spread through the city of **Megasaki, Japan**, and Mayor Kobayashi has demanded all dogs to be sent to Trash Island.',
                    image: [Object],
                    createdAt: '2023-01-23T05:58:58.110Z',
                    updatedAt: '2023-01-27T07:11:53.523Z',
                    publishedAt: '2023-01-23T06:01:31.679Z'
                }
            },
            {
                id: 4,
                attributes: {
                    title: 'Min granne Totoro',
                    imdbId: 'tt0096283',
                    intro: 'When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.',
                    image: [Object],
                    createdAt: '2023-01-23T09:15:23.153Z',
                    updatedAt: '2023-01-27T07:12:08.242Z',
                    publishedAt: '2023-01-23T09:15:43.382Z'
                }
            },
            {
                id: 3,
                attributes: {
                    title: 'The Shawshank Redemption',
                    imdbId: 'tt0111161',
                    intro: 'Over the course of several years, **two convicts form a friendship**, seeking consolation and, eventually, redemption through basic compassion.',
                    image: [Object],
                    createdAt: '2023-01-23T07:17:34.923Z',
                    updatedAt: '2023-01-27T07:12:24.582Z',
                    publishedAt: '2023-01-23T07:17:39.384Z'
                }
            },
            {
                id: 6,
                attributes: {
                    title: 'Forrest Gump',
                    imdbId: 'tt0109830',
                    intro: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.\n' +
                        '\n',
                    image: [Object],
                    createdAt: '2023-03-12T17:06:09.208Z',
                    updatedAt: '2023-03-12T17:06:16.668Z',
                    publishedAt: '2023-03-12T17:06:16.643Z'
                }
            },
            {
                id: 5,
                attributes: {
                    title: 'The Muppets',
                    imdbId: 'tt1204342',
                    intro: "It's a movie about muppets.",
                    image: [Object],
                    createdAt: '2023-02-21T15:35:43.751Z',
                    updatedAt: '2024-01-22T09:23:11.711Z',
                    publishedAt: '2024-01-22T09:23:11.688Z'
                }
            },
            {
                id: 2,
                attributes: {
                    title: 'Encanto',
                    imdbId: 'tt2953050',
                    intro: 'A Colombian teenage girl has to face the frustration of being **the only member of her family** without magical powers.\n' +
                        '\n',
                    image: [Object],
                    createdAt: '2023-01-23T06:46:24.765Z',
                    updatedAt: '2025-01-15T10:41:46.386Z',
                    publishedAt: '2023-01-23T06:46:29.324Z'
                }
            },
            {
                id: 10,
                attributes: {
                    title: 'Training Day',
                    imdbId: 'tt0139654',
                    intro: "A rookie cop spends his first day as a Los Angeles narcotics officer with a rogue detective who isn't what he appears to be.\n",
                    image: [Object],
                    createdAt: '2025-01-15T10:42:27.694Z',
                    updatedAt: '2025-01-15T10:43:33.044Z',
                    publishedAt: '2025-01-15T10:43:33.027Z'
                }
            }
        ]
    );
    const response = await request(app)
        .get('/movies')
        .expect('Content-Type', /html/)
        .expect(200);
    expect(response.text).toMatch('Pulp Fiction');
    expect(response.text).toMatch('Fire Walk With Me');
    expect(response.text).toMatch('Isle of dogs');
    expect(response.text).toMatch('Min granne Totoro');
    expect(response.text).toMatch('The Shawshank Redemption');
    expect(response.text).toMatch('Forrest Gump');
    expect(response.text).toMatch('The Muppets');
    expect(response.text).toMatch('Encanto');
    expect(response.text).toMatch('Training Day');
});

test('Test to check that page get status 500 when wrong id on movis/:id', async () => {
    const app = initApp(loadMovies())
    await request(app)
        .get('/movies/wronId')
        .expect('Content-Type', /html/)
        .expect(500);
});

test('Test to check that wrong search path to a site gives a 404 message', async () => {
    const app = initApp(loadMovies());
    await request(app)
        .get('/wronSearchPath')
        .expect('Content-Type', /html/)
        .expect(404);
});
