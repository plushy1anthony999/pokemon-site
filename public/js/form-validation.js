'use strict';

export function validateLoginForms() {
    window.addEventListener('load', () => {
		const forms = document.getElementsByClassName('needs-validation');

        Array.prototype.forEach.call(forms, form => {
            form.addEventListener('submit', event => {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
}