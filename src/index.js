import './assets/styles/styles.css'
import './assets/styles/forms.css'
import './assets/styles/sidebar.css'
import projectManager from './modules/projectManager'
import DOM from './modules/DOM';
import storageAvailable from './modules/storage/storageAvailable'
import todoItem from "./modules/todoItem"
import project from "./modules/project";


if (storageAvailable("localStorage")) {

    var PROJECT_MANAGER = projectManager();

    if(localStorage.getItem("projects")){
        PROJECT_MANAGER.projects = parse(localStorage.getItem("projects"), {project, todoItem}); 

        PROJECT_MANAGER.selectedProject = parseSelectedProject(localStorage.getItem("selectedProject"), {project, todoItem}); 
    } else {

        PROJECT_MANAGER.createProject("All");
        PROJECT_MANAGER.selectedProject = PROJECT_MANAGER.projects[0];

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        PROJECT_MANAGER.selectedProject.createTask("First Project", 
            "You can edit or delete this project by clicking on it", 
            formattedDate,
            "High",
            "All"
        );
    }
        

        const page = DOM(PROJECT_MANAGER);

        page.reloadTasks()

        page.initialize();



    onbeforeunload = (event) => {
        localStorage.clear();
        
        localStorage.setItem("projects", JSON.stringify(PROJECT_MANAGER.projects))
        localStorage.setItem("selectedProject", JSON.stringify(PROJECT_MANAGER.selectedProject))
    };
}else {

}

function process(obj){

    for(let key in obj){
        if(typeof obj[key] === 'object'){
            process(obj[key])
        }
        if(typeof obj[key] === 'function'){
            obj[key] = obj[key].toString()
        }
    }
    return JSON.stringify(obj);
}
  
function parse(json, modules) {

    console.log(json)
    const projects = [];
    json = JSON.parse(json)

    for(let project in json){
        projects.push(modules.project(json[project].title))
        projects[project].status = json[project].status

        for(let task in json[project].tasks){

            const p = json[project].tasks[task]

            projects[project].tasks.push(modules.todoItem(p.title, p.description, p.dueDate, p.priority, p.project))
            projects[project].tasks[task].status = p.status
        }
    }

    return projects
}

function parseSelectedProject(json, modules){
    const project = JSON.parse(json)
    const selectedProject = modules.project(project.title)
    selectedProject.status = project.status

    for(let task in project.tasks){
        const p = project.tasks[task]

        selectedProject.tasks.push(modules.todoItem(p.title, p.description, p.dueDate, p.priority, p.project))
        selectedProject.tasks[task].status = p.status
    }

    return selectedProject
}

