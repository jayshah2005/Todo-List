export default function getProjectName(DOM){

    const content = document.querySelector('#content');

    const form = document.createElement('form');
    form.className = 'input';
    const label = document.createElement('label');
    label.setAttribute('for', 'name');
    label.innerHTML = 'Project Name'
    form.appendChild(label);
    const input = document.createElement('input');
    input.autocomplete = true;
    input.type = 'text';
    input.id = 'name';
    form.appendChild(input);
    const div = document.createElement('div');
    div.className = 'formButtons';
    const edit = document.createElement('button')
    edit.innerHTML = 'Edit';
    edit.className = 'button';
    edit.id = 'create'
    const cancel = document.createElement('button');
    cancel.innerHTML = 'Cancel';
    cancel.className = 'button';
    cancel.id = 'cancel';
    div.appendChild(edit);
    div.appendChild(cancel);
    form.appendChild(div);
    content.appendChild(form)


    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.querySelector('#name')

        if (event.submitter.id === 'create' & name.value != "") {
            DOM.PROJECT_MANAGER.selectedProject.title = name.value;
            DOM.reloadSidebar();
            DOM.updateSelectedProject();
        } else if(event.submitter.id === 'create' & name.value == "") {
            name.focus();
            return;
        }

        form.remove();
    })
    

}