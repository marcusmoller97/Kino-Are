// The base url to search on the api.
const BASE_URL = `https://plankton-app-xhkom.ondigitalocean.app/api/`;

/**
 * 
 * @param {*} id Which movie to find screenings for. 
 * @returns Returns information about all screenings.
 */
async function fetchScreeningsMovie (id) {
    try {
        const res = await fetch(BASE_URL + `screenings?populate=movie&filters[movie]=${id}`);
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
 * 
 * @param {*} apiArray 
 * @returns 
 */
function upcomingScreenings (apiArray) {
    // todays date
    const date = new Date();
    const screeningArray = apiArray.map((item) => {
        const compareDate = new Date(item.attributes.start_time);
        if (compareDate > date) {
            return item;
        }
    });

    return screeningArray;
}

let payload = await fetchScreeningsMovie(8);
payload = upcomingScreenings(payload);


export {
    upcomingScreenings,
    fetchScreeningsMovie
} 