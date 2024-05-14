import getProjectName from "./forms/getProjectName"
import updateProjectName from './forms/updateProjectName'
import displayError from './forms/displayError';
import projectIcon from './../assets/images/projectIcon.png'
import askConfirmation from "./forms/AskConfirmation";
import addTask from "./forms/addTask";
import editTask from "./forms/editTask"

export default function DOM(PROJECT_MANAGER){

    return{

        PROJECT_MANAGER: PROJECT_MANAGER,

        initialize(){
            const addProject = document.querySelector('#addProject')

            addProject.addEventListener('click', (event) => {
                getProjectName(this);
            }) 

            const projectTitle = document.querySelector('#projectTitle')
            projectTitle.addEventListener('click', (event)=>{
                updateProjectName(this);
            })

            const img = document.createElement('img')
            img.src = projectIcon
            projectTitle.append(img);

            const titleText = document.createElement('div');
            titleText.id = 'titleText'
            projectTitle.append(titleText)

            const deletePoject = document.querySelector('#deleteProject')
            deletePoject.addEventListener('click', (event) => {

                if(PROJECT_MANAGER.selectedProject.title === "All"){
                    displayError("You cannot delete this Project");
                    return;
                }

                askConfirmation(this);
            })

            const addTaskDiv = document.querySelector('#addTask')
            addTaskDiv.addEventListener('click', () => {
                addTask(this)
            })

            
            this.reloadSidebar();
            this.updateSelectedProject();
        },

        deleteProject(){
            PROJECT_MANAGER.deleteProject();
            PROJECT_MANAGER.selectedProject = this.PROJECT_MANAGER.projects.find((elem) => elem.title === "All") ;
            this.reloadSidebar();
            this.updateSelectedProject();
            this.reloadTasks();
        },

        reloadSidebar(){
            const projects = document.querySelector('#projects')

            while (projects.firstChild) { 
                projects.removeChild(projects.firstChild); 
            }

            this.PROJECT_MANAGER.projects.forEach(project => {
                const projectDiv = this.createProjectElement(project);
                projects.append(projectDiv);
            });
        },

        createProjectElement(project){
            const projectDiv = document.createElement('div')
            projectDiv.className = 'project'
            projectDiv.id = project.title

            projectDiv.addEventListener('click', (event) => {

                // If checkbox is the one causing this event then cancel it.
                if(event.target.id == "") return;
                PROJECT_MANAGER.selectedProject = this.PROJECT_MANAGER.projects.find((elem) => elem.title === event.target.id) ;
                this.updateSelectedProject();
                this.reloadTasks()
            })

            const text = document.createElement('div');
            text.className = 'text'
            text.innerHTML = project.title;

            projectDiv.append(text);

            // To not add a status feild for the all section
            if(project.title === "All") return projectDiv;

            const checkBox = document.createElement('div');
            if(project.status == true) checkBox.className = 'checkBox checked';
            else checkBox.className = 'checkBox';

            checkBox.addEventListener('click', (event)=>{
                project.changeStatus();
                if(project.status == true) checkBox.className = 'checkBox checked';
                else checkBox.className = 'checkBox';
            })

            projectDiv.appendChild(checkBox);

            return projectDiv;
        },

        updateSelectedProject(){

            const projectsDiv = document.querySelector('#projects').children;

            for(const projectDiv of projectsDiv){
                projectDiv.className = 'project';
            }
        
            this.findProjectDiv(PROJECT_MANAGER.selectedProject).className = 'project selected';
            document.querySelector('#titleText').innerHTML = PROJECT_MANAGER.selectedProject.title;
        },

        findProjectDiv(project){
            const projectsDiv = document.querySelector('#projects').children;

            for(const projectDiv of projectsDiv){
                if(projectDiv.firstElementChild.innerHTML === project.title) return projectDiv;
            }
        },

        // Reloads all the tasks for the deleted project on the DOM
        reloadTasks(){

            const projects = document.querySelector('#tasks')

            while (projects.firstChild) { 
                projects.removeChild(projects.firstChild); 
            }

            const tasks = document.querySelector('#tasks')

            PROJECT_MANAGER.selectedProject.tasks.forEach((task)=>{
                const taskDiv = document.createElement('div')
                taskDiv.classList = 'task ' + task.priority;

                const content = document.createElement('div');
                content.className = 'content';

                taskDiv.addEventListener('click', (event) => {
                    const caller = PROJECT_MANAGER.selectedProject.tasks.find(elem => {
                        return elem.title === event.target.querySelector('.title').innerHTML &
                        elem.description === event.target.querySelector('.description').innerHTML &
                        elem.dueDate === event.target.querySelector('.dueDate').innerHTML.split(" ")[2] &
                        elem.priority === event.currentTarget.className.split(" ")[1]
                    })
                    editTask(caller, this);
                })

                taskDiv.appendChild(content);

                const title = document.createElement('div');
                title.className = 'title'
                title.innerHTML = task.title;
                content.append(title);

                const dueDate = document.createElement('div');
                dueDate.className = 'dueDate'
                dueDate.innerHTML = 'Due on ' + task.dueDate.toString();
                content.append(dueDate);

                const description = document.createElement('div');
                description.className = 'description'
                description.innerHTML = task.description;
                content.append(description);

                const options = document.createElement('div');
                options.className = 'options'
                taskDiv.appendChild(options);

                const checkBoxDiv = document.createElement('div');

                if(task.status == true) checkBoxDiv.className = 'checkBox checked';
                else checkBoxDiv.className = 'checkBox';
    
                checkBoxDiv.addEventListener('click', (event)=>{
                    task.changeStatus();
                    if(task.status == true) checkBoxDiv.className = 'checkBox checked';
                    else checkBoxDiv.className = 'checkBox';
                })
    
                options.append(checkBoxDiv);

                tasks.append(taskDiv);
            })
        }
    }

}