function generateTestimonials() {
    const container = document.querySelector(".revContainer");
    container.innerHTML = `
        <div class="revCard active">
            <img src="user1.jpg" alt="User 1">
            <h3>Alexis Hernandez</h3>
            <p>“This page is really beautiful. The best thing is the smooth slider with great UI design.”</p>
        </div>
         <div class="revCard">
            <img src="user1.jpg" alt="User 1">
            <h3>kiko</h3>
            <p>“This page is really beautiful. The best thing is the smooth slider with great UI design.”</p>
        </div>
         <div class="revCard">
            <img src="user1.jpg" alt="User 1">
            <h3>moji</h3>
            <p>“This page is really beautiful. The best thing is the smooth slider with great UI design.”</p>
        </div>
    `;
}

generateTestimonials();

let currentIndex = 0;
const revCard = document.querySelectorAll(".revCard");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
    revCard.forEach((revCard, i) => {
        revCard.classList.remove("active");
        dots[i].classList.remove("active");
    });

    revCard[index].classList.add("active");
    dots[index].classList.add("active");
}

function changeSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
}

// Auto-slide every 5 seconds
// setInterval(() => {
//     currentIndex = (currentIndex + 1) % revCard.length;
//     showSlide(currentIndex);
// }, 5000);

showSlide(currentIndex);
