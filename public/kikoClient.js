async function fetchRev() {
	try {
		const response = await fetch(
			"https://plankton-app-xhkom.ondigitalocean.app/api/reviews"
		);
		const data = await response.json();
		console.log(data);
		return data.reviews;
	} catch (error) {
		console.error("Error fetching reviews:", error);
		return [];
	}
}

//----------------review generator---------------
gRevCard();
function gRevCard() {
    const container = document.querySelector(".revPages");
    container.innerHTML = `
        <div class="revPage active">
            <div class="card">
                <img src="kommenter1600.png" alt="User 1" />
                <div class="revCardInfo">
                    <div class="name-stars">
                        <h3>Alexis</h3>
                        <p>5</p>
                    </div>
                    <p>“This page is really beautiful. The best thing is the smooth slider with great UI design.”</p>
                </div>
            </div>
        </div>
        <div class="revPage">
            <div class="card">
                <img src="kommenter1600.png" alt="User 1" />
                <div class="revCardInfo">
                    <div class="name-stars">
                        <h3>Alexis</h3>
                        <p>5</p>
                    </div>
                    <p>“This page is really beautiful. The best thing is the smooth slider with great UI design.”</p>
                </div>
            </div>
        </div>
        <div class="revPage">
            <div class="card">
                <img src="kommenter1600.png" alt="User 1" />
                <div class="revCardInfo">
                    <div class="name-stars">
                        <h3>Alexis</h3>
                        <p>5</p>
                    </div>
                    <p>“This page is really beautiful. The best thing is the smooth slider with great UI design.”</p>
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
