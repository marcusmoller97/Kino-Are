
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