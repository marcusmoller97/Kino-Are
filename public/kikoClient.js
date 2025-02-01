document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = 0;
    const testimonials = document.querySelectorAll(".revCard");
    const dots = document.querySelectorAll(".dot");

    function showSlide(index) {
        testimonials.forEach((revCard, i) => {
            revCard.classList.remove("active");
            dots[i].classList.remove("active");
        });

        testimonials[index].classList.add("active");
        dots[index].classList.add("active");
    }

    function changeSlide(index) {
        currentIndex = index;
        showSlide(currentIndex);
    }

    showSlide(currentIndex);
});