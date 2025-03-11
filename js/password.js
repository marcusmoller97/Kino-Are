const pathUrl = window.location.pathname.toLowerCase();

if (pathUrl === "/login") {
	document.addEventListener("DOMContentLoaded", () => {
		document
			.querySelector(".loginForm")
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

function updateErrorPrompt (element, message, isError = true) {
	element.classList.remove("d-none", "bg-danger", "bg-success");
	element.textContent = message;

	if (message === "") {
		element.classList.add("d-none");
	} else {
		element.classList.add(isError ? "bg-danger" : "bg-success");
	}
}

function createAccount () {
	const firstName = document.getElementById("firstName").value;
	const lastName = document.getElementById("lastName").value;
	const fullName = firstName + " " + lastName;
	const email = document.getElementById("email").value;
	const phoneNumber = document.getElementById("phoneNumber").value;
	const password = document.getElementById("password").value;
	const repeatedPassword = document.getElementById("repeatedPassword").value;
	const errorPrompt = document.querySelector(".errorPromp");
	updateErrorPrompt(errorPrompt, "");
	if (password !== repeatedPassword) {
		updateErrorPrompt(errorPrompt, "Lösenorden matchar inte");
		return;
	} else if (password.length < 8) {
		updateErrorPrompt(errorPrompt, "lösenord måste vara minst 8 tecken!");
		return;
	} else if (localStorage.getItem(email)) {
		updateErrorPrompt(
			errorPrompt,
			"Ett konto med denna mailadress finns redan!"
		);
		return;
	}
	if (checkPassword(password) == false) {
		updateErrorPrompt(
			errorPrompt,
			"Lösenordet måste innehålla en kombination av stora och små bokstäver, siffror och minst ett specialtecken (-+_!?@&*,.#)"
		);
		return;
	};

	localStorage.setItem(
		email,
		JSON.stringify({ fullName, email, phoneNumber, password })
	);

	updateErrorPrompt(
		errorPrompt,
		"Välkommen " + fullName + " Du har nu skapat ditt konto",
		false
	);
}

function checkPassword (password) {
	let requiredSigns = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-+_!?@&*,.#]).");
	if (requiredSigns.test(password)) {
		return true;
	}
	else {
		return false;
	}

}
function login () {
	const email = document.querySelector("#email").value;
	const password = document.querySelector("#password").value;
	const user = JSON.parse(localStorage.getItem(email));


	if (!localStorage.getItem(email)) {
		alert("Fel epostadress");
		return;
	} else if (user.password !== password) {
		/* alert("Fel Lösenord"); */
		const div = document.querySelector('#unsuccesLogin');
		div.style.display = "block";
		setTimeout(() => {
			div.style.display = "none";
		}, "5000");
		return;
	}
	if (localStorage.getItem(email) && user.password === password) {
		/* alert("Du är inloggad"); */
		const div = document.querySelector('#succesLogin');
		div.style.display = "block";
		setTimeout(() => {
			div.style.display = "none";
		}, "5000");
	}
}

function clearSession () {
	localStorage.clear();
}

// TODO: Funktion för login med från sparad data i localStorage
