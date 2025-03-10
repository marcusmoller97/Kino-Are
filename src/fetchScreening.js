// The base url to search on the api.
const BASE_URL = `https://plankton-app-xhkom.ondigitalocean.app/api/`;

/**
 * 
 * @param {*} id Which movie to find screenings for. 
 * @returns Returns information about all screenings.
 */
async function fetchScreeningsMovie (id) {
    try {
        const res = await fetch(BASE_URL + `screenings?populate=movie&filters[movie]=${id}&pagination[pageSize]=1000`);
        if (!res.ok) {
            throw new Error(`Failed to fetch from API! Status: ${res.status} - ${res.statusText}`);
        }
        const payload = await res.json();

        return payload.data;
    } catch (error) {
        console.log('Failed to fetch from api: ', error);
    };
}

/**
 * Function to sort on the upcoming movies
 * @param {*} apiArray takes the data from the api with all screenings times for a movie.
 * @returns Returns an array with just the upcoming screenings based on the date.
 */
function upcomingScreenings (apiArray) {
    // todays date
    const date = new Date();
    const screeningArray = apiArray.filter((item) => {
        const compareDate = new Date(item.attributes.start_time);
        return compareDate > date;
    });

    return screeningArray;
}

export {
    upcomingScreenings,
    fetchScreeningsMovie
};
