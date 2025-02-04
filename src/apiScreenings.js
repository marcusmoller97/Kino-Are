

/* export async function getScreenings(){
    const viewingsAPI = "https://plankton-app-xhkom.ondigitalocean.app/api/screenings";
    const response = await fetch(viewingsAPI);
    const payload = await response.json();
    const viewings = payload.data;
    console.log("All screenings: "+viewings);
    return viewings;
}

function toScreeningObject(apiObject){
    return{
        id: apiObject.id,
        ...apiObject.attributes,
    };
}*/