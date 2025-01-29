document.getElementById("reviewForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');
    console.log("Movie ID:", movieId);

    const reviewData = {
        name: document.getElementById("name").value,
        rating: document.getElementById("rating").value,
        comment: document.getElementById("comment").value,
        verified: true,
        movie: movieId,  
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "userId",
        updatedBy: "userId"
    };

    fetch("https://plankton-app-xhkom.ondigitalocean.app/api/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Recension skickad:", data);
    })
    .catch(error => {
        console.error("Fel vid skickande av recension:", error);
    });
});
