const viewingsAPI = "https://plankton-app-xhkom.ondigitalocean.app/api/screenings?populate=movie";

export default async function getScreenings(){
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