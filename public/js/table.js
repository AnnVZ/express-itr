import createHeadInputListener from './listeners/table_head_input_listener.js'
import createInputsListeners from './listeners/table_inputs_listener.js'

async function loadTable() {
    let users = await fetch('/users');
    let json = await users.json();
    for (let user of json) {
        document.getElementById('root').insertAdjacentHTML('beforeend', '<tr><td><div class="custom-control custom-checkbox"><input name="' + user.id + '" type="checkbox" class="custom-control-input" id="' + user.id + '"/><label class="custom-control-label" for="' + user.id + '" /></div></td><td>' + user.id + '</td><td>' + user.name + '</td><td>' + user.email + '</td><td>' + new Date(user.regdate).toDateString() + '</td><td>' + new Date(user.logindate).toDateString() + '</td><td>' + (user.blocked == 1 ? 'blocked': '') + '</td></tr>');
    }
}

window.addEventListener('load', async function () {
    await loadTable();
    createHeadInputListener();
    createInputsListeners();
}, false);