import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import reviewUtils from '../../src/reviewUtils';

describe('Tests that fetchReviews is working', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return empty array:', async () => {
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

    const fetchFunction = await reviewUtils.fetchReviews();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(fetchFunction).toEqual(emptyApi.data);
  });

  it('Should return only valid reviews', async () => {
    const mockReviews = {
      data: [
        {
          attributes: {
            movie: { data: { id: 1, attributes: { title: 'Movie A' } } },
            rating: 4.5,
          },
        },
        {
          attributes: {
            movie: { data: null }, // This should be filtered out
            rating: 3.0,
          },
        },
        {
          attributes: {
            movie: { data: { id: 2, attributes: { title: 'Movie B' } } },
            rating: 5.0,
          },
        },
      ],
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockReviews),
      })
    );

    await reviewUtils.fetchReviews();
    const validReviews = reviewUtils.fetchValidReviews();

    expect(validReviews).toHaveLength(2);
  });

  it('should be able to handle fetch errors', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })
    );

    const validReviews = await reviewUtils.fetchReviews();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(validReviews).toBeUndefined();
  });
  it('Should return only reviews from the last 30 days', () => {
    const today = new Date();
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(today.getDate() - 10);

    const fortyDaysAgo = new Date();
    fortyDaysAgo.setDate(today.getDate() - 40);
    const mockReviews = [
      {
        attributes: {
          createdAt: tenDaysAgo.toISOString(),
          movie: { data: { id: 1, attributes: { title: 'Movie A' } } },
        },
      },
      {
        attributes: {
          createdAt: fortyDaysAgo.toISOString(),
          movie: { data: { id: 2, attributes: { title: 'Movie B' } } },
        },
      },
      {
        attributes: {
          createdAt: today.toISOString(),
          movie: { data: { id: 3, attributes: { title: 'Movie C' } } },
        },
      },
    ];

    // Call function under test
    const recentReviews = reviewUtils.fetchRecentReviews(mockReviews);

    expect(recentReviews).toHaveLength(2);

    expect(recentReviews[0].attributes.movie.data.id).toBe(1);
    expect(recentReviews[1].attributes.movie.data.id).toBe(3);
  });

  it('Should return the top 5 movies sorted by average rating', () => {
    const mockRecentReviews = [
      {
        attributes: {
          movie: {
            data: {
              id: 1,
              attributes: { title: 'Movie A', image: { url: 'imageA.jpg' } },
            },
          },
          rating: 4.5,
        },
      },
      {
        attributes: {
          movie: {
            data: {
              id: 2,
              attributes: { title: 'Movie B', image: { url: 'imageB.jpg' } },
            },
          },
          rating: 5.0,
        },
      },
      {
        attributes: {
          movie: {
            data: {
              id: 3,
              attributes: { title: 'Movie C', image: { url: 'imageC.jpg' } },
            },
          },
          rating: 3.0,
        },
      },
      {
        attributes: {
          movie: {
            data: {
              id: 4,
              attributes: { title: 'Movie D', image: { url: 'imageD.jpg' } },
            },
          },
          rating: 4.0,
        },
      },
      {
        attributes: {
          movie: {
            data: {
              id: 5,
              attributes: { title: 'Movie E', image: { url: 'imageE.jpg' } },
            },
          },
          rating: 4.8,
        },
      },
      {
        attributes: {
          movie: {
            data: {
              id: 6,
              attributes: { title: 'Movie F', image: { url: 'imageF.jpg' } },
            },
          },
          rating: 3.5,
        },
      },
      {
        attributes: {
          movie: {
            data: {
              id: 1,
              attributes: { title: 'Movie A', image: { url: 'imageA.jpg' } },
            },
          },
          rating: 4.0,
        },
      },
      {
        attributes: {
          movie: {
            data: {
              id: 2,
              attributes: { title: 'Movie B', image: { url: 'imageB.jpg' } },
            },
          },
          rating: 4.9,
        },
      },
    ];

    const top5Movies = reviewUtils.getTop5Movies(mockRecentReviews);

    expect(top5Movies).toHaveLength(5);
    expect(top5Movies[0].id).toBe(2);
    expect(top5Movies[1].id).toBe(5);
    expect(top5Movies[2].id).toBe(1);
    expect(top5Movies[3].id).toBe(4);
    expect(top5Movies[4].id).toBe(6);
  });
});
