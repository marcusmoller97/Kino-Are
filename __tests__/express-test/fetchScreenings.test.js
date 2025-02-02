import { describe, expect, it, jest, beforeEach } from '@jest/globals';

import { fetchScreeningsMovie } from '../../src/fetchScreening';

describe('Tests that the fetchScreeningsMovie can handle diffrent calls from api and return an array or error message depending on data.', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return array with length 1', async () => {
    const fakeApi = {
      data: [
        {
          id: 295,
          attributes: {
            start_time: '2025-02-13T17:00:00.000Z',
            room: 'Stora salongen',
            createdAt: '2025-01-29T14:19:16.064Z',
            updatedAt: '2025-01-29T14:19:16.064Z',
            movie: {
              data: {
                id: 9,
                attributes: {
                  title: 'Fire Walk With Me',
                  imdbId: 'tt0105665',
                  intro:
                    "Laura Palmer's harrowing final days are chronicled one year after the murder of Teresa Banks, a resident of Twin Peaks' neighboring town.",
                  image: {
                    url: 'https://m.media-amazon.com/images/M/MV5BYzJmZGFiMzAtODNhOC00NzAwLWFlMzAtYTQzYmRmYjIwNDgyXkEyXkFqcGc@._V1_.jpg',
                  },
                  createdAt: '2024-03-08T14:45:51.745Z',
                  updatedAt: '2025-01-15T09:55:10.071Z',
                  publishedAt: '2024-03-08T14:45:55.807Z',
                },
              },
            },
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          pageSize: 25,
          pageCount: 1,
          total: 1,
        },
      },
    };
    //Mock fetch to return fakeApi
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(fakeApi),
      })
    );

    const screenings = await fetchScreeningsMovie(9);

    expect(fetch).toHaveBeenCalledWith(
      'https://plankton-app-xhkom.ondigitalocean.app/api/screenings?populate=movie&filters[movie]=9'
    );

    expect(screenings).toHaveLength(1);
  });

  it('Should return array with length 3', async () => {
    const fakeApi = {
      data: [
        {
          id: 295,
          attributes: {
            start_time: '2025-02-13T17:00:00.000Z',
            room: 'Stora salongen',
            createdAt: '2025-01-29T14:19:16.064Z',
            updatedAt: '2025-01-29T14:19:16.064Z',
            movie: {
              data: {
                id: 9,
                attributes: {
                  title: 'Fire Walk With Me',
                  imdbId: 'tt0105665',
                  intro:
                    "Laura Palmer's harrowing final days are chronicled one year after the murder of Teresa Banks, a resident of Twin Peaks' neighboring town.",
                  image: {
                    url: 'https://m.media-amazon.com/images/M/MV5BYzJmZGFiMzAtODNhOC00NzAwLWFlMzAtYTQzYmRmYjIwNDgyXkEyXkFqcGc@._V1_.jpg',
                  },
                  createdAt: '2024-03-08T14:45:51.745Z',
                  updatedAt: '2025-01-15T09:55:10.071Z',
                  publishedAt: '2024-03-08T14:45:55.807Z',
                },
              },
            },
          },
        },
        {
          id: 296,
          attributes: {
            start_time: '2025-02-13T17:00:00.000Z',
            room: 'Stora salongen',
            createdAt: '2025-01-29T14:19:16.064Z',
            updatedAt: '2025-01-29T14:19:16.064Z',
            movie: {
              data: {
                id: 9,
                attributes: {
                  title: 'Fire Walk With Me',
                  imdbId: 'tt0105665',
                  intro:
                    "Laura Palmer's harrowing final days are chronicled one year after the murder of Teresa Banks, a resident of Twin Peaks' neighboring town.",
                  image: {
                    url: 'https://m.media-amazon.com/images/M/MV5BYzJmZGFiMzAtODNhOC00NzAwLWFlMzAtYTQzYmRmYjIwNDgyXkEyXkFqcGc@._V1_.jpg',
                  },
                  createdAt: '2024-03-08T14:45:51.745Z',
                  updatedAt: '2025-01-15T09:55:10.071Z',
                  publishedAt: '2024-03-08T14:45:55.807Z',
                },
              },
            },
          },
        },
        {
          id: 297,
          attributes: {
            start_time: '2025-02-05T17:00:00.000Z',
            room: 'Stora salongen',
            createdAt: '2025-01-29T14:20:16.064Z',
            updatedAt: '2025-01-29T14:20:16.064Z',
            movie: {
              data: {
                id: 9,
                attributes: {
                  title: 'Fire Walk With Me',
                  imdbId: 'tt0105665',
                  intro:
                    "Laura Palmer's harrowing final days are chronicled one year after the murder of Teresa Banks, a resident of Twin Peaks' neighboring town.",
                  image: {
                    url: 'https://m.media-amazon.com/images/M/MV5BYzJmZGFiMzAtODNhOC00NzAwLWFlMzAtYTQzYmRmYjIwNDgyXkEyXkFqcGc@._V1_.jpg',
                  },
                  createdAt: '2024-03-08T14:45:51.745Z',
                  updatedAt: '2025-01-15T09:55:10.071Z',
                  publishedAt: '2024-03-08T14:45:55.807Z',
                },
              },
            },
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          pageSize: 25,
          pageCount: 1,
          total: 3,
        },
      },
    };
    //Mock fetch to return fakeApi
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(fakeApi),
      })
    );

    const screenings = await fetchScreeningsMovie(9);

    expect(fetch).toHaveBeenCalledWith(
      'https://plankton-app-xhkom.ondigitalocean.app/api/screenings?populate=movie&filters[movie]=9'
    );

    expect(screenings).toHaveLength(3);
  });

  it('should return empty array if theres no screening for a movie', async () => {
    // Result if there is no screening for cms-API.
    const emptyApi = {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 25,
          pageCount: 0,
          total: 0,
        },
      },
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(emptyApi),
      })
    );

    const id = '2';
    const screenings = await fetchScreeningsMovie(id);

    expect(fetch).toHaveBeenCalledWith(
      `https://plankton-app-xhkom.ondigitalocean.app/api/screenings?populate=movie&filters[movie]=${id}`
    );
    expect(screenings).toHaveLength(0);
  });

  it('should be able to handle fetch errors', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })
    );

    const id = 'fakeId';
    const screening = await fetchScreeningsMovie(id);

    expect(fetch).toHaveBeenCalledWith(
      `https://plankton-app-xhkom.ondigitalocean.app/api/screenings?populate=movie&filters[movie]=${id}`
    );
    expect(screening).toBeUndefined();
  });
});
