import getScreenings from "./apiScreenings.js";

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
            console.log(screening);
            const screeningDate = new Date(screening.start_time);
            if(screeningDate <= limit && screeningDate >= today){
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
    console.log("sorted screenings");
    console.log(upcomingScreenings);
    return upcomingScreenings;
}



