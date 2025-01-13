const movies = {
    allMovies: [], 
    released: [], 
    upcoming: [],
    //Function that adds all movies to an array
    async getAllMovies() {
        
        fetch("content/movies.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(element => {
                this.allMovies.push(element);
            });
        })
        .catch (error => {
            console.error('Problem fetching:', error);
        });
    },

    //Function that adds released movies to an array
    async getReleasedMovies() {

        fetch("content/movies.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(element => {
                if (!element.comingSoon) //Checking if comingSoon is false
                this.released.push(element);
            });
        })
        .catch (error => {
            console.error('Problem fetching:', error);
        });
    },

    //Function that adds upcoming movies to an array
    async getUpcomingMovies() {

        fetch("content/movies.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(element => {
                if (element.comingSoon) //Checking if comingSoon is true
                this.upcoming.push(element);
            });
        })
        .catch (error => {
            console.error('Problem fetching:', error);
        });
    }
};

export { movies };