import getProjectName from "./forms/getProjectName"
import updateProjectName from './forms/updateProjectName'
import projectIcon from './../assets/images/projectIcon.png'

export default function DOM(PROJECT_MANAGER){

    return{

        PROJECT_MANAGER: PROJECT_MANAGER,

        initialize(){
            const addProject = document.querySelector('#addProject')
            console.log(this.PROJECT_MANAGER.projects)

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
            
            this.reloadSidebar();
            this.updateSelectedProject();
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
        }
    }

}