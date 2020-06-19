export default function createInputsListeners() {
    let inputs = document.getElementsByTagName('input');
    Array.prototype.filter.call(inputs, function (input) {
        input.addEventListener('input', function (event) {
            setInputValidityClass(input);
        });
    });
}

function setInputValidityClass(input) {
    let valid = input.checkValidity();
    valid ? replaceClassWith(input, 'is-invalid', 'is-valid') : replaceClassWith(input, 'is-valid', 'is-invalid');
    if (input.id === 'password_signup' || input.id === 'password_rep') {
        setPasswordValidity();
    }
}

function setPasswordValidity() {
    let passw = document.getElementById('password_signup');
    let passw_rep = document.getElementById('password_rep');
    let feedback = document.getElementById('password_feedback');
    if (passw.value !== passw_rep.value) {
        replaceClassWith(passw_rep, 'is-valid', 'is-invalid');
        feedback.textContent = 'Passwords are different.';
    } else if (!passw.value) {
        feedback.textContent = 'Please choose your password.';
    }
}

function replaceClassWith(element, classToRemove, classToAdd) {
    let classList = element.classList;
    classList.remove(classToRemove);
    classList.add(classToAdd);
}