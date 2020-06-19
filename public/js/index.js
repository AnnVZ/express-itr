import createFormsListeners from './listeners/auth_form_listener.js'
import createInputsListeners from './listeners/auth_inputs_listener.js'

window.addEventListener('load', () => {
    createFormsListeners();
    createInputsListeners();
}, false);