//import { getScreenings } from '/apiScreenings';

const viewingsAPI = "https://plankton-app-xhkom.ondigitalocean.app/api/screenings?populate=movie";

async function getScreenings(){
    const response = await fetch(viewingsAPI);
    const payload = await response.json();
    const screenings = payload.data.map(toScreeningObject);
   //const screenings = payload.data;
    console.log(screenings);
    console.log(screenings[0].movie.data.attributes.title);
    return screenings;
}

function toScreeningObject(apiObject){
    return{
        id: apiObject.id,
        ...apiObject.attributes,
    };
}

const date1 = new Date();
date1.setDate(date1.getDate() +2);
const date2 = new Date();
date2.setDate(date2.getDate() +10);
const date3 = new Date();
date3.setDate(date3.getDate() -2);
const date4 = new Date();
date4.setDate(date4.getDate() +4);


const fakeScreenings = [ {   
    id: 111,
    start_time: date1,
    room: 'Stora salongen',
    createdAt: '2025-01-02T14:19:16.064Z',
    movie: { data: {
        id: 1,
        attributes: {
            title: "Fire walk with me",
            imdbID: "tt0105665"
        }
    }}
},
{
    id: 112,
    start_time: date2,
    room: 'Stora salongen',
    createdAt: '2025-01-0217:00:00:000Z',
    movie: { data: {
        id: 1,
        attributes: {
            title: "Fire walk with me",
            imdbID: "tt0105665"
        }
    }}
},
{
    id: 113,
    start_time: date3,
    room: 'Stora salongen',
    createdAt: '2025-01-02T14:19:16.064Z',
    movie: { data: {
        id: 1,
        attributes: {
            title: "Fire walk with me",
            imdbID: "tt0105665"
        }
    }}
},
{
    id: 114,
    start_time: date4,
    room: 'Stora salongen',
    createdAt: '2025-01-0217:00:00:000Z',
    movie: { data: {
        id: 1,
        attributes: {
            title: "Fire walk with me",
            imdbID: "tt0105665"
        }
    }}
}]



export default function sortScreenings(screenings){
    console.log("in sortScreenings");
    console.log(screenings);

    let screeningsToShow = [];
    
    for(let i = 5; i > 0; i--){
        screeningsToShow = [];
        const today = new Date();
        const limit = new Date();
        limit.setDate(limit.getDate() + i);
        console.log("today: "+today);
        console.log("Limit: "+limit);
        screenings.forEach((screening) => {
            console.log(screening.start_time);
            if(screening.start_time <= limit && screening.start_time >= today){
                screeningsToShow.push(screening);
                console.log("added to list");
            }
        })
        if(screeningsToShow.length <= 10){
            return screeningsToShow;
        }
    }
}

export async function fetchUpcomingScreenings(){
    const screenings = await getScreenings();
    const upcomingScreenings = sortScreenings(screenings);
   // const upcomingScreenings = sortScreenings(fakeScreenings);
    console.log("sorted screenings");
    console.log(upcomingScreenings);
    return upcomingScreenings;
}



