
const viewingsAPI = "https://plankton-app-xhkom.ondigitalocean.app/api/reviews";
export async function getScreenings(){
    const response = await fetch(viewingsAPI);
    const payload = await response.json();
    const viewings = payload.data.map(toScreeningObject);
    console.log(viewings);
    return viewings;
}

function toScreeningObject(apiObject){
    return{
        id: apiObject.id,
        ...apiObject.attributes,
    };
}

function sortScreenings(screenings){
    const today = new Date();
    const limit = new Date();
    limit.setDate(+5);

    const screeningsToShow = screenings.filter((screening) => {
        const showingDate = new Date(screening.createdAt);
        return showingDate <= limit && showingDate >= today;
    })
    if(screeningsToShow <= 10){
        return screeningsToShow;
    }else{
        for(let i = 4; i>0; i++){
            limit.setDate(limit.getDate + i);
            screeningsToShow = screenings.filter((screening) => {
                const showingDate = new Date(screening.createdAt);
                return showingDate <= limit && showingDate <= today;
            });
            if(screeningsToShow <= 10){
                break;
            }
        }


      
        
    }
}

