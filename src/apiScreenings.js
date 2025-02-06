const screeningsAPI = "https://plankton-app-xhkom.ondigitalocean.app/api/screenings?populate=movie";

export default async function getScreenings(){
    const response = await fetch(screeningsAPI);
    const payload = await response.json();
    const screenings = payload.data.map(toScreeningObject);
    return screenings;
}

function toScreeningObject(apiObject){
    return{
        id: apiObject.id,
        ...apiObject.attributes,
    };
}