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
  /**
   *
   */
  getTop5Movies(recentArray) {
    let movies = {};

    console.log("Hej", recentArray);

    recentArray.forEach((review) => {
      // All ids for all reviews that are valid
      let id = review.attributes.movie.data.id;

      if (!movies[id]) {
        movies[id] = review;
        console.log("Lägger till filmen:", movies[id]);
      } else {
        console.log("Denna finns redan!");
      }
    });
    console.log("Detta är movies loggen, senaste", movies);

    /* const sortArray = recentArray.filter((item) => { */
    /* console.log(item); */

    // kolla filmnamn
    // om filmen finns så gå in i array där film finns
    // annars skapa nytt obect med filmnamn

    //funktion sorterar betyg per film
    //räknar ut medelvärde per film
    // lägger till film med medelvärde betyg i object
    /* }); */
  },
};

await reviewUtils.fetchReviews();
reviewUtils.fetchRecentReviews(reviewUtils.fetchValidReviews());
console.log("-------------------------------");
/* console.log(reviewUtils.recentReviews); */
const recentArray = reviewUtils.recentReviews;
reviewUtils.getTop5Movies(recentArray);
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
