export default function createHeadInputListener() {
    let input = document.getElementById('head_input');
    input.addEventListener('input', event => {
        Array.prototype.filter.call(document.getElementsByTagName('input'), checkbox => {
            checkbox.checked = event.target.checked ? true : false;
        });
    })
}