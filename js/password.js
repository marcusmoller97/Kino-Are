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
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const fullName = firstName + ' ' + lastName;
  const email = document.getElementById('email').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const password = document.getElementById('password').value;
  const repeatedPassword = document.getElementById('repeatedPassword').value;

  if (password !== repeatedPassword) {
    // TODO: Korrekt logik för att visa felmeddelande enligt figma
    alert('Lösenorden matchar inte');
    return;
  } else if (password.length < 8) {
    alert('lösenord måste vara minst 8 tecken!');
    return;
  } else if (localStorage.getItem(email)) {
    alert('Ett konto med denna mailadress finns redan!');
    return;
  }

  localStorage.setItem(
    email,
    JSON.stringify({ fullName, email, phoneNumber, password })
  );

  alert('Välkommen ' + fullName + ' Du har nu skapat ditt konto');
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
