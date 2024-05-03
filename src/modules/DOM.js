import getProjectName from "./forms/getProjectName"

export default function DOM(){

    return{

        selectedProject: null,

        initializeSideBar(PROJECT_MANAGER){
            const sidebar = document.querySelector('#sidebar')
            const addProject = document.querySelector('#addProject')
            console.log(PROJECT_MANAGER.projects)

            addProject.addEventListener('click', (event) => {
                getProjectName(PROJECT_MANAGER);
            }) 
        },

        reloadSidebar(PROJECT_MANAGER){
            const projects = document.querySelector('#projects')

            while (projects.firstChild) { 
                projects.removeChild(projects.firstChild); 
            }

            PROJECT_MANAGER.projects.forEach(project => {
                const projectDiv = this.createProjectElement(project);
                projects.append(projectDiv);
            });
        },

        updateSelectedProject(){

            const projectsDiv = document.querySelector('#projects').children;

            for(const projectDiv of projectsDiv){
                projectDiv.className = 'project';
            }
        
            this.selectedProject.className = 'project selected';
        },

        createProjectElement(project){
            const projectDiv = document.createElement('div')
            projectDiv.className = 'project'
            projectDiv.innerHTML = project.title;

            projectDiv.addEventListener('click', (event) => {

                // If checkbox is the one causing this event then cancel it.
                if(event.target.innerHTML == "") return;
                this.selectedProject = event.target;
                this.updateSelectedProject();
            })

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
        }
    }

}