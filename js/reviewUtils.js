/**
 * @author Marcus och Christian
 */

const reviewUtils = {
  BASE_URL: 'https://plankton-app-xhkom.ondigitalocean.app/api/',
  API: [],
  recentReviews: [],
  /**
   * Function to fetch
   */
  async fetchReviews() {
    try {
      const url =
        this.BASE_URL + 'reviews?populate=movie&pagination[pageSize]=1000';
      console.log(url);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      let reviews = await response.json();

      this.API = reviews.data;
    } catch (error) {
      console.error(error.message);
    }
  },
  /**
   *
   */
  fetchValidReviews() {
    // removes movies with null value.
    const filteredReviews = this.API.filter(
      (item) => item.attributes.movie.data !== null
    );

    /*     console.log("Filtered reviews: ", filteredReviews); */
    return filteredReviews;
  },
  /**
   * Function to sort on the ratings in the last 30 days.
   */
  fetchRecentReviews(apiCall) {
    const storageArray = [];
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    for (const review of apiCall) {
      const reviewDate = new Date(review.attributes.createdAt);

      if (reviewDate >= thirtyDaysAgo) {
        storageArray.push(review);
      }
    }
    this.recentReviews = storageArray;
  },
  /**
   *
   */
  getTop5Movies(recentArray) {
    // Example output:   { "id": "101", "title": "Enchanto", "avgRating": 9.2 },

    //Objekt som innehåller alla olika filmer
    let movies = {};
    let top5Movies = [];

    recentArray.forEach((review) => {
      // All ids for all reviews that are valid
      let id = review.attributes.movie.data.id;
      let rating = review.attributes.rating;

      if (!movies[id]) {
        movies[id] = {
          title: review.attributes.movie.data.attributes.title,
          id: id,
          totalRating: 0,
          ratingCount: 0,
          averageRating: 0,
        };
      }
      movies[id].ratingCount++;
      movies[id].totalRating += rating;
      movies[id].averageRating = parseFloat(
        movies[id].totalRating / movies[id].ratingCount
      ).toFixed(1);
    });

    let moviesArray = Object.values(movies);
    moviesArray.sort((a, b) => b.averageRating - a.averageRating);
    top5Movies = moviesArray.slice(0, 5);
    return top5Movies;
  },
};

await reviewUtils.fetchReviews();
reviewUtils.fetchRecentReviews(reviewUtils.fetchValidReviews());
const recentArray = reviewUtils.recentReviews;
reviewUtils.getTop5Movies(recentArray);
