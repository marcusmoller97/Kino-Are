const pathUrl = window.location.pathname;

if (pathUrl === '/test-login') {
  document.addEventListener('DOMContentLoaded', () => {
    document
      .getElementById('loginForm')
      .addEventListener('submit', function (event) {
        event.preventDefault();
        login();
      });
  });
} else if (pathUrl === '/test') {
  document.addEventListener('DOMContentLoaded', () => {
    document
      .getElementById('registerForm')
      .addEventListener('submit', function (event) {
        event.preventDefault();
        createAccount();
      });
  });
}

function createAccount() {
  const förnamn = document.getElementById('förnamn').value;
  const efternamn = document.getElementById('efternamn').value;
  const name = förnamn + ' ' + efternamn;
  const mailadress = document.getElementById('email').value;
  const telefon = document.getElementById('telefon').value;
  const lösenord = document.getElementById('lösenord').value;
  const upprepatLösenord = document.getElementById('upprepaLösenord').value;

  /*   console.error('Här kommer lösenordets längd');
  console.log(
    '------------------------------------------------------------------'
  ); */

  if (lösenord !== upprepatLösenord) {
    // TODO: Korrekt logik för att visa felmeddelande enligt figma
    alert('Lösenorden matchar inte');
    return;
  } else if (lösenord.length < 8) {
    alert('lösenord måste vara minst 8 tecken!');
    return;
  } else if (localStorage.getItem(mailadress)) {
    alert('Ett konto med denna mailadress finns redan!');
    return;
  }

  localStorage.setItem(
    mailadress,
    JSON.stringify({ name, mailadress, telefon, lösenord })
  );

  console.log(förnamn, efternamn, mailadress, telefon, lösenord);
  console.log('Nu har det submittats');
}

function login() {
  const email = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const user = JSON.parse(localStorage.getItem(email));

  if (!localStorage.getItem(email)) {
    alert('Fel epostadress');
    return;
  } else if (user.lösenord !== password) {
    alert('Fel Lösenord');
    return;
  }
  if (localStorage.getItem(email) && user.lösenord === password) {
    alert('Du är inloggad');
  }
}

function clearSession() {
  localStorage.clear();
}

// TODO: Funktion för login med från sparad data i localStorage
