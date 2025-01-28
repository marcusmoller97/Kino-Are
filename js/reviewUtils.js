async function fetchRecentReviews() {
  const API = "https://plankton-app-xhkom.ondigitalocean.app/api/reviews";
  try {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 365);

    const recentReviews = [];

    for (const review of data.data) {
      const reviewDate = new Date(review.attributes.createdAt);

      if (reviewDate >= thirtyDaysAgo) {
        recentReviews.push(review);
      }
    }

    console.log(recentReviews);

    return data;
  } catch (error) {
    console.error(error.message);
  }
}

fetchRecentReviews();
