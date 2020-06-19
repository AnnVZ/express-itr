export default function createFormsListeners() {
    Array.prototype.filter.call(document.getElementsByClassName('form-to-validate'), form => {
        form.addEventListener('submit', function (event) {
            if (!isValidForm(event.target)) {
                event.preventDefault();
                event.stopPropagation();
                //sending form and checking name!
                // window.location.href = './table.html';
                // fetch('/table');
            }
        });
    });
}

function isValidForm(form) {
    let isValid = true;
    let inputs = form.getElementsByTagName('input');
    Array.prototype.filter.call(inputs, function (input) {
        if (!input.value || input.classList.contains('is-invalid')) {
            input.dispatchEvent(new Event('input'));
            isValid = false;
        }
    });
    return isValid;
}