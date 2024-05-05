import getProjectName from "./forms/getProjectName"

export default function DOM(PROJECT_MANAGER){

    return{

        PROJECT_MANAGER: PROJECT_MANAGER,

        initializeSideBar(){
            const addProject = document.querySelector('#addProject')
            console.log(this.PROJECT_MANAGER.projects)

            addProject.addEventListener('click', (event) => {
                getProjectName(this);
            }) 
            
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

        updateSelectedProject(){

            const projectsDiv = document.querySelector('#projects').children;

            for(const projectDiv of projectsDiv){
                projectDiv.className = 'project';
            }
        
            this.findProjectDiv(PROJECT_MANAGER.selectedProject).className = 'project selected';
        },

        createProjectElement(project){
            const projectDiv = document.createElement('div')
            projectDiv.className = 'project'
            projectDiv.id = project.title
7
            projectDiv.addEventListener('click', (event) => {

                // If checkbox is the one causing this event then cancel it.
                if(event.target.innerHTML == "") return;
                PROJECT_MANAGER.selectedProject = this.PROJECT_MANAGER.projects.find((elem) => elem.title === event.target.id) ;
                this.updateSelectedProject();
            })

            const text = document.createElement('div');
            text.className = 'text'
            text.innerHTML = project.title;

            projectDiv.append(text);

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

        findProjectDiv(project){
            const projectsDiv = document.querySelector('#projects').children;

            for(const projectDiv of projectsDiv){
                if(projectDiv.firstElementChild.innerHTML === project.title) return projectDiv;
            }
        }
    }

}