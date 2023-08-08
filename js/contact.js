var contactForm = document.getElementById('contact-form');
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var messageInput = document.getElementById('message');

nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);
messageInput.addEventListener("blur", validateMessage);

function validateName() {
    var error = document.getElementById("name-error");
    var nameRegex = /^[a-zA-Z0-9\s]+$/;
    if (nameInput.value.length >= 3 && nameRegex.test(nameInput.value)) {
        error.style.display = "none";
        return true;
    } else {
        error.style.display = "block";
        error.textContent = "Minímo 3 caractéres y alfanuméricos.";
        return false;
    }
}

function validateEmail() {
    var error = document.getElementById("email-error");
    if (emailInput.value.includes("@") && emailInput.value.includes(".")) {
        error.style.display = "none";
        return true;
    } else {
        error.style.display = "block";
        error.textContent = "Email inválido.";
        return false;
    }
}

function validateMessage() {
    var error = document.getElementById("message-error");
    if (messageInput.value.length >= 5) {
        error.style.display = "none";
        return true;
    } else {
        error.style.display = "block";
        error.textContent = "Mínimo 5 caracteres.";
        return false;
    }
}

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var name = validateName();
    var email = validateEmail();
    var msg = validateMessage();
    if (name && email && msg) {
        //Email body
        var subject = 'SIMON GAME';
        var body = `Hola, Soy ${nameInput.value} ! \n${messageInput.value}.`;

        var mailToLink = `mailto:${emailInput.value}?subject=${encodeURIComponent(subject)}
                          &body=${encodeURIComponent(body)}`;

        window.location.href = mailToLink;

        window.open(mailToLink, 'email', 'app=mail');
    }
});
