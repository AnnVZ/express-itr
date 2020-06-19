import { setCookie, getCookie } from './../cookies.js'

export default function createInputsListeners() {
    let cookieName = 'checked_count';
    setCookie(cookieName, 0);
    let inputs = document.getElementsByTagName('input');
    for (let input of inputs) {
        input.addEventListener('change', event => {
            let checked_count = getCookie(cookieName);
            if (event.target.id !== 'head_input') {
                setCookie(cookieName, event.target.checked ? ++checked_count : --checked_count);
                document.getElementById('head_input').checked = (!checked_count || checked_count != document.getElementById('root').childElementCount) ? false : true;
            } else {
                setCookie(cookieName, event.target.checked ? 2 : 0);
            }
        });
    }
}