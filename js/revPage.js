createRevCard("itsmeKiko", "5", "hellow kiko");



function createRevCard( name, rating, comment) {
    const container = document.createElement('div');
    container.className = 'cardContainer';
    container.innerHTML = `
        <div class="imgHolder">
            <img class="movieImg" src="pictures/1.jpeg" />
        </div>
        <div class="moviesRev">
            <h1>Reviews</h1>
            <div class="revCard">
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
            </div>
            <button class="backBtn">Back to home</button>
        </div>
    `;
    document.body.appendChild(container);
}