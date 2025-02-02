async function fetchRev(movieId) {
    try {
        const response = await fetch(
            `https://plankton-app-xhkom.ondigitalocean.app/api/reviews?filters[movie]=${movieId}`
        );
        const result = await response.json();
        const reviews = result.data;

        createRevPage(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
    }
}

fetchRev(2);

function createRevPage(reviews) {
    const container = document.querySelector(".revPages");
    container.innerHTML = '';

    let pageCount = Math.ceil(reviews.length / 5);
    for (let i = 0; i < pageCount; i++) {
        const revPage = document.createElement('div');
        revPage.classList.add('revPage');
        if (i === 0) revPage.classList.add('active');

        const start = i * 5;
        const end = start + 5;
        const pageReviews = reviews.slice(start, end);

        pageReviews.forEach(review => {
            const { name, comment, rating, author } = review.attributes;
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="/pictures/kommenter1600.png" alt="User 1" />
                <div class="revCardInfo">
                    <div class="name-stars">
                        <h3>${author}</h3>
                        <p>${rating}</p>
                    </div>
                    <p>“${comment}”</p>
                </div>
            `;
            revPage.appendChild(card);
        });

        container.appendChild(revPage);
    }

    createDots(pageCount);
}

function createDots(pageCount) {
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('dots');

    for (let i = 0; i < pageCount; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('onclick', `changeSlide(${i})`);
        dotsContainer.appendChild(dot);
    }

    document.querySelector(".revPages").appendChild(dotsContainer);
}

function changeSlide(index) {
    const pages = document.querySelectorAll('.revPage');
    const dots = document.querySelectorAll('.dot');

    pages.forEach(page => page.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    pages[index].classList.add('active');
    dots[index].classList.add('active');
}
