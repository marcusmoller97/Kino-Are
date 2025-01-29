/**
 * @author Marcus och Christian
 */

const reviewUtils = {
  BASE_URL: "https://plankton-app-xhkom.ondigitalocean.app/api/",
  API: [],
  recentReviews: [],
  /**
   * Function to fetch
   */
  async fetchReviews() {
    try {
      const url =
        this.BASE_URL + "reviews?populate=movie&pagination[pageSize]=1000";
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

    console.log("Filtered reviews: ", filteredReviews);
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
};

await reviewUtils.fetchReviews();
reviewUtils.fetchRecentReviews(reviewUtils.fetchValidReviews());
console.log("-------------------------------");
console.log(reviewUtils.recentReviews);
/* console.log(reviewUtils.API); */

/* reviewUtils.fetchRecentReviews();
console.log(reviewUtils.recentReviews); */

/* reviewUtils.fetchValidReviews(); */

/**
 *  TODO:
 * sortera fem högsta betyg
 * sortera på film baserat på id
 *
 **/
