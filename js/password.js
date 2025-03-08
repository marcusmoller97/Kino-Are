const pathUrl = window.location.pathname.toLowerCase();

if (pathUrl === "/test-login") {
	document.addEventListener("DOMContentLoaded", () => {
		document
			.getElementById("loginForm")
			.addEventListener("submit", function (event) {
				event.preventDefault();
				login();
			});
	});
} else if (pathUrl === "/signup") {
	document.addEventListener("DOMContentLoaded", () => {
		document
			.getElementById("registerForm")
			.addEventListener("submit", function (event) {
				event.preventDefault();
				createAccount();
			});
	});
}

function createAccount() {
	const firstName = document.getElementById("firstName").value;
	const lastName = document.getElementById("lastName").value;
	const fullName = firstName + " " + lastName;
	const email = document.getElementById("email").value;
	const phoneNumber = document.getElementById("phoneNumber").value;
	const password = document.getElementById("password").value;
	const repeatedPassword = document.getElementById("repeatedPassword").value;
	const errorPrompt = document.querySelector(".errorPromp");
	errorPrompt.textContent = "";
	errorPrompt.classList.remove("text-danger", "text-success");

	if (password !== repeatedPassword) {
		const errorMsg = "Lösenorden matchar inte";
		errorPrompt.textContent = errorMsg;
		errorPrompt.classList.add("text-danger");
		return;
	} else if (password.length < 8) {
		const errorMsg = "lösenord måste vara minst 8 tecken!";
		errorPrompt.textContent = errorMsg;
		errorPrompt.classList.add("text-danger");
		return;
	} else if (localStorage.getItem(email)) {
		const errorMsg = "Ett konto med denna mailadress finns redan!";
		errorPrompt.textContent = errorMsg;
		errorPrompt.classList.add("text-danger");
		return;
	}

	localStorage.setItem(
		email,
		JSON.stringify({ fullName, email, phoneNumber, password })
	);

	const successMsg = "Välkommen " + fullName + " Du har nu skapat ditt konto";
	errorPrompt.textContent = successMsg;
	errorPrompt.classList.add("text-success");
}

function login() {
	const email = document.querySelector("#username").value;
	const password = document.querySelector("#password").value;
	const user = JSON.parse(localStorage.getItem(email));

	if (!localStorage.getItem(email)) {
		alert("Fel epostadress");
		return;
	} else if (user.lösenord !== password) {
		alert("Fel Lösenord");
		return;
	}
	if (localStorage.getItem(email) && user.lösenord === password) {
		alert("Du är inloggad");
	}
}

function clearSession() {
	localStorage.clear();
}

// TODO: Funktion för login med från sparad data i localStorage
