document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerForm').addEventListener('submit', function (event) {
        event.preventDefault();
        createAccount();
    });
});



function createAccount () {
    const förnamn = document.getElementById('förnamn').value;
    const efternamn = document.getElementById('efternamn').value;
    const name = förnamn + " " + efternamn;
    const mailadress = document.getElementById('email').value;
    const telefon = document.getElementById('telefon').value;
    const lösenord = document.getElementById('lösenord').value;
    const upprepatLösenord = document.getElementById('upprepaLösenord').value;

    if (lösenord !== upprepatLösenord) {

        // TODO: Korrekt logik för att visa felmeddelande enligt figma
        alert('Lösenorden matchar inte');
        return;
    }

    if (localStorage.getItem(mailadress)) {
        alert('Ett konto med denna mailadress finns redan!');
        return;
    }

    /* const keyExist = Object.keys(localStorage).some(key => key === mailadress)

    if (keyExist) {
      alert('Ett konto med denna mailadress finns redan!');
      return;
    } */

    Object.keys(localStorage).forEach(key => {
        let value = localStorage.getItem(key);
        console.log(key);
    });

    localStorage.setItem(mailadress, JSON.stringify({ name, mailadress, telefon, lösenord }));


    console.log(förnamn, efternamn, mailadress, telefon, lösenord);
    console.log('Nu har det submittats');
}

function clearSession () {
    localStorage.clear();
}

// TODO: Funktion för login med från sparad data i localStorage
