async function fetchRev() {
    try {
        const response = await fetch(
            "https://plankton-app-xhkom.ondigitalocean.app/api/reviews"
        );
        const result = await response.json();
        const reviews = result.data;

        reviews.forEach(review => {
            const { name, comment, rating, author } = review.attributes;
            console.log(`Name: ${name}, Comment: ${comment}, Rating: ${rating}, Author: ${author}`);
        });
        reviews.forEach(review => {
            const { name, comment, rating, author } = review.attributes;
            gRevCard(author, comment, rating);
        });
    } catch (error) {
        console.error("Error fetching reviews:", error);
    }
}

// Call the function to execute it
fetchRev();
//----------------review generator---------------
gRevCard();
function gRevCard(author, comment, rating) {
    const container = document.querySelector(".revPages");
    container.innerHTML = `
        <div class="revPage active">
            <div class="card">
                <img src="/pictures/kommenter1600.png" alt="User 1" />
                <div class="revCardInfo">
                    <div class="name-stars">
                        <h3>${author}</h3>
                        <p>${rating}</p>
                    </div>
                    <p>“${comment}”</p>
                </div>
            </div>
        </div>
        <div class="dots">
            <span class="dot active" onclick="changeSlide(0)"></span>
            <span class="dot" onclick="changeSlide(1)"></span>
            <span class="dot" onclick="changeSlide(2)"></span>
        </div>
    `;
}

//---------------pagingation funtion---------
let currentIndex = 0;
const revPage = document.querySelectorAll(".revPage");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
	revPage.forEach((revPage, i) => {
		revPage.classList.remove("active");
		dots[i].classList.remove("active");
	});

	revPage[index].classList.add("active");
	dots[index].classList.add("active");
}

function changeSlide(index) {
	currentIndex = index;
	showSlide(currentIndex);
}
showSlide(currentIndex);

// Auto-slide every 5 seconds
// setInterval(() => {
//     currentIndex = (currentIndex + 1) % revPage.length;
//     showSlide(currentIndex);
// }, 5000);
