export default function askConfirmation(DOM){
    const content = document.querySelector('#content');

    const form = document.createElement('form');
    form.className = 'input';
    const label = document.createElement('label');
    label.innerHTML = "Are you sure you want to <br>delete this project?";
    form.appendChild(label);
    const div = document.createElement('div');
    div.className = 'formButtons';
    const yes = document.createElement('button')
    yes.innerHTML = 'Yes';
    yes.className = 'button';
    yes.id = 'yes'
    const goBack = document.createElement('button');
    goBack.innerHTML = 'Go Back';
    goBack.className = 'button';
    goBack.id = 'goBack';
    div.appendChild(yes);
    div.appendChild(goBack);
    form.appendChild(div);
    content.appendChild(form)



    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (event.submitter.id === 'yes') {
            DOM.deleteProject();
        }

        form.remove();

    })
    

}