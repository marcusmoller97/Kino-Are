//---------root----------

const movieId = 1;
fetchReviews(movieId).then(reviews => createReviewCards(reviews));
//-------func section---------


//-------Fetch reviews for a specific movie----------
async function fetchReviews(movieId) {
    const response = await fetch(`https://plankton-app-xhkom.ondigitalocean.app/api/reviews?filters[movie]=${movieId}&pagination[page]=1&pagination[pageSize]=10`);
    const data = await response.json();
    return data.data;
}

//--------Create review cards review--------
function createReviewCards(reviews) {
    reviews.forEach(review => {
        const { name, rating, comment } = review.attributes;
        createRevCard(name, rating, comment);
    });
}

//-------func to generate review card--------
function createRevCard(name, rating, comment) {
    const appendTo = document.querySelector(".loadHere");
    const container = document.createElement("div");
    container.className = "revCard";
    container.innerHTML = `
        <img class="revImg" src="pictures/kommenter1600.png" />
        <div class="revInfo">
            <div class="name-rating">
                <p class="revName">${name}</p>
                <p class="revRating">${rating}</p>
            </div>
            <div class="revComment">
                <p class="comment">${comment}</p>
            </div>
        </div>
    `;
    appendTo.appendChild(container);
}
