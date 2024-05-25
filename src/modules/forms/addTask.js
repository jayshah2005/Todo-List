import displayError from "./displayError"
import { makeTouchable, makeUntouchable } from "./makeUntouchable";

export default function addTask(DOM){

    makeUntouchable();
    
    const content = document.body;

    const form = document.createElement('form');
    form.className = 'input';


    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.innerHTML = 'Project Name'
    form.appendChild(nameLabel);
    const Nameinput = document.createElement('input');
    Nameinput.autocomplete = true;
    Nameinput.type = 'text';
    Nameinput.id = 'name';
    form.appendChild(Nameinput);
    
    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.innerHTML = 'Description (Optional)'
    form.appendChild(descriptionLabel);
    const descriptionInput = document.createElement('textarea');
    descriptionInput.id = 'description';
    form.appendChild(descriptionInput);

    const dateLabel = document.createElement('label');
    dateLabel.setAttribute('for', 'date');
    dateLabel.innerHTML = 'Project Due Date'
    form.appendChild(dateLabel);
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'date';
    form.appendChild(dateInput);

    const priorityDiv = document.createElement('div');
    priorityDiv.id = "priority"
    const priorityText = document.createElement('div')
    priorityText.innerHTML = "Priority: "
    priorityDiv.appendChild(priorityText)
    form.appendChild(priorityDiv);

    const priorities = ["Low", "Medium", "High"]

    priorities.forEach((priority) => {

        const priorityInputLow = document.createElement('input');
        priorityInputLow.type = 'radio';
        priorityInputLow.name = "priority"
        priorityInputLow.id = priority;
        priorityDiv.appendChild(priorityInputLow);

        const priorityLabelLow = document.createElement('label');
        priorityLabelLow.innerHTML = priority;
        priorityLabelLow.setAttribute('for', priority);
        priorityDiv.appendChild(priorityLabelLow);
    })

    const projectDiv = document.createElement('div');
    projectDiv.id = "project"
    const projectText = document.createElement('div')
    projectText.innerHTML = "Project: "
    projectDiv.appendChild(projectText)
    form.appendChild(projectDiv);

    const projects = DOM.PROJECT_MANAGER.projects

    projects.forEach((project) => {

        const priorityInputLow = document.createElement('input');
        priorityInputLow.type = 'radio';
        priorityInputLow.name = "project"
        priorityInputLow.id = project.title;
        projectDiv.appendChild(priorityInputLow);

        const priorityLabelLow = document.createElement('label');
        priorityLabelLow.innerHTML = project.title;
        priorityLabelLow.setAttribute('for', project.title);
        projectDiv.appendChild(priorityLabelLow);
    })

    const div = document.createElement('div');
    div.className = 'formButtons';
    const create = document.createElement('button')
    create.innerHTML = 'Create';
    create.className = 'button';
    create.id = 'create'
    const cancel = document.createElement('button');
    cancel.innerHTML = 'Cancel';
    cancel.className = 'button';
    cancel.id = 'cancel';
    div.appendChild(create);
    div.appendChild(cancel);
    form.appendChild(div);
    content.appendChild(form)

    const x = '#' + DOM.PROJECT_MANAGER.selectedProject.title;

    form.querySelector('#Medium').setAttribute('checked', true);
    form.querySelector('[id="' + x.replace('#', '') + '"]').setAttribute('checked', true);

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = form.querySelector('#name').value;
        const description = form.querySelector('#description').value;
        const date = form.querySelector('#date').value;
        const priority = form.querySelector("input[type='radio'][name=priority]:checked").id;
        const project = form.querySelector("input[type='radio'][name=project]:checked").id;

        if (event.submitter.id === 'create' & name != "" & date != "") {
            DOM.PROJECT_MANAGER.selectedProject.createTask(name, description, date, priority, project);
            DOM.reloadTasks()
        } else if(event.submitter.id === 'create') {
            displayError("Please fill out all required feilds")
            return;
        }

        makeTouchable();
        form.remove();
    })
    

}