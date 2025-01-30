
const viewingsAPI = "https://plankton-app-xhkom.ondigitalocean.app/api/reviews";
export async function getViewings(){
    const response = await fetch(viewingsAPI);
    const payload = await response.json();
    const viewings = payload.data.map(toViewingObject);
    console.log(viewings);
    return viewings;
}

function toViewingObject(apiObject){
    return{
        id: apiObject.id,
        ...apiObject.attributes,
    };
}

function sortViewings(viewings){
    const today = new Date();
    const limit = new Date();
    limit.setDate(+5);

    const viewingsToShow = viewings.filter((viewing) => {
        const showingDate = new Date(review.createdAt);
        return showingDate <= limit && showingDate >= today;
    })
    if(viewingsToShow <= 10){
        return viewingsToShow;
    }else{
        
    }
}