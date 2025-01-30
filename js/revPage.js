const movieId = 1;
let currentPage = 1;

fetchReviews(movieId, currentPage).then((reviews) => revCard(reviews));
//-------Fetch reviews for a specific movie----------
async function fetchReviews(movieId, page) {
    const response = await fetch(
        `https://plankton-app-xhkom.ondigitalocean.app/api/reviews?filters[movie]=${movieId}&pagination[page]=${page}&pagination[pageSize]=5`
    );
    const data = await response.json();
    return data.data;
}

//--------Create review cards review--------
function revCard(reviews) {
    const appendTo = document.querySelector(".loadHere");
    appendTo.innerHTML = ''; // Clear previous reviews

    reviews.forEach((review) => {
        const { name, rating, comment } = review.attributes;
        createRevCard(name, rating, comment);
    });

    // Create pagination controls
    createPaginationControls();
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

//-------func to create pagination controls--------
function createPaginationControls() {
    const previousBtn = document.querySelector(".previousBtn");
    const forwardBtn = document.querySelector(".forwardBtn");

    // Remove existing event listeners
    const newPreviousBtn = previousBtn.cloneNode(true);
    const newForwardBtn = forwardBtn.cloneNode(true);
    previousBtn.parentNode.replaceChild(newPreviousBtn, previousBtn);
    forwardBtn.parentNode.replaceChild(newForwardBtn, forwardBtn);

    newPreviousBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            fetchReviews(movieId, currentPage).then((reviews) => revCard(reviews));
        }
    });

    newForwardBtn.addEventListener("click", () => {
        fetchReviews(movieId, currentPage + 1).then((reviews) => {
            if (reviews.length > 0) {
                currentPage++;
                revCard(reviews);
            }
        });
    });
}
