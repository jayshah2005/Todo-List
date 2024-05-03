import getProjectName from "./forms/getProjectName"

export default function DOM(){

    return{
        initializeSideBar(PROJECT_MANAGER){
            const sidebar = document.querySelector('#sidebar')
            const addProject = document.querySelector('#addProject')
            console.log(PROJECT_MANAGER.projects)

            addProject.addEventListener('click', (event) => {
                getProjectName(PROJECT_MANAGER);
            }) 
        },

        updateSidebar(PROJECT_MANAGER){
            const projects = document.querySelector('#projects')
            console.log('it works!')
            while (projects.firstChild) { 
                projects.removeChild(projects.firstChild); 
            }

            PROJECT_MANAGER.projects.forEach(project => {
                const projectDiv = this.createProjectElement(project);
                projects.append(projectDiv);
            });
        },

        createProjectElement(project){
            const projectDiv = document.createElement('div')
            projectDiv.className = 'project'
            projectDiv.innerHTML = project.title;
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