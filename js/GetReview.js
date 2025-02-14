document.addEventListener("DOMContentLoaded", () => {
	const revSection = document.querySelector(".revSection");
	const movieId = revSection.getAttribute("data-movie-id");
	let currentPage = 1;
	let totalPages = 1;
	//--------Pagination controls-------
	const prevButton = document.createElement("button");
	prevButton.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;
	prevButton.classList.add("paginationBtn");
	prevButton.disabled = true;

	const nextButton = document.createElement("button");
	nextButton.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
	nextButton.classList.add("paginationBtn");

	const dotsContainer = document.createElement("div");
	dotsContainer.classList.add("dots");

	//-------Add controls to DOM----------
	const controlsContainer = document.createElement("div");
	controlsContainer.classList.add("paginationControls");
	controlsContainer.append(prevButton, dotsContainer, nextButton);
	document.querySelector(".revPages").after(controlsContainer);
	//-----------custom endpoint instead of cms---------
	async function fetchRev(page = 1) {
		try {
			const response = await fetch(`/api/movies/${movieId}/reviews?page=${page}&pageSize=5`);

			if (!response.ok) {
				throw new Error(`Failed to load reviews: ${response.statusText}`);
			}

			const result = await response.json();

			if (result.message) {
				//--if endpoint return no rev fuound--
				displayNoReviewsMessage();
				return;
			}

			totalPages = result.meta?.pagination?.pageCount || 1;
			currentPage = result.meta?.pagination?.page || 1;

			createRevPage(result.data);
			updateControls();
		} catch (error) {
			console.error("Error fetching reviews:", error);
			displayErrorMessage();
		}
	}

	function displayNoReviewsMessage() {
		const container = document.querySelector(".revPages");
		container.innerHTML = `<p class="no-reviews">No reviews yet. Be the first to review!</p>`;
	}

	function displayErrorMessage() {
		const container = document.querySelector(".revPages");
		container.innerHTML = `<p class="error-message">Failed to load reviews.try again later.</p>`;
	}

	function createRevPage(reviews) {
		const container = document.querySelector(".revPages");
		container.innerHTML = "";

		const revPage = document.createElement("div");
		revPage.classList.add("revPage", "active");

		reviews.forEach((review) => {
			const { author, comment, rating } = review.attributes;
			const card = document.createElement("div");
			card.classList.add("card");
			card.innerHTML = `
                <img src="/pictures/kommenter1600.png" alt="No image found!" />
                <div class="revCardInfo">
                    <div class="name-stars">
                        <h3>${author}</h3>
                        <div class="rating">
                            ${Array.from({ length: 5 },(_, i) => ` <i class="fa-star ${i < rating ? "fa-solid yellow" : "fa-regular"}"></i>`).join("")}
                        </div>
                    </div>
                    <p class="comment">“${comment}”</p>
                </div>
            `;
			revPage.appendChild(card);
		});

		container.appendChild(revPage);
		createDots(totalPages);
	}

	function createDots(pageCount) {
		dotsContainer.innerHTML = "";

		for (let i = 0; i < pageCount; i++) {
			const dot = document.createElement("span");
			dot.classList.add("dot");
			if (i + 1 === currentPage) dot.classList.add("active");
			dot.addEventListener("click", () => changeSlide(i + 1));
			dotsContainer.appendChild(dot);
		}
	}

	function updateControls() {
		prevButton.disabled = currentPage === 1;
		nextButton.disabled = currentPage === totalPages;
	}

	function changeSlide(page) {
		currentPage = page;
		fetchRev(currentPage);
	}

	//--------eventL--------
	prevButton.addEventListener(
		"click",
		() => currentPage > 1 && changeSlide(currentPage - 1)
	);
	nextButton.addEventListener(
		"click",
		() => currentPage < totalPages && changeSlide(currentPage + 1)
	);
	fetchRev();
});