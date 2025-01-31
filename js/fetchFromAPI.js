// to append screenings info from movie
addEventListener('DOMContentLoaded', async () => {
    try {

        const id = window.location.pathname.split('/').slice(-1).pop();

        const screeningContainer = document.querySelector('.screeningsTable');

        const response = await fetch(`/screenings/upcoming/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const screenings = await response.json();

        console.log(screenings);


        
    } catch (error) {
        console.error(error);
    }
}); 
