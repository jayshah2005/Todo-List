export default function getProjectName(error){

    const content = document.querySelector('#content');

    const form = document.createElement('form');
    form.className = 'input';
    const label = document.createElement('label');
    label.innerHTML = error;
    form.appendChild(label);
    const div = document.createElement('div');
    div.className = 'formButtons';
    const ok = document.createElement('button')
    ok.innerHTML = 'Ok';
    ok.className = 'button';
    ok.id = 'ok'
    div.appendChild(ok);
    form.appendChild(div);
    content.appendChild(form)


    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.remove();
    })
    

}