import getProjectName from "./forms/getProjectName"

export default function DOM(){
    return{

        initializeSideBar(PROJECT_MANAGER){
            const sidebar = document.querySelector('#sidebar')
            const addProject = document.querySelector('#addProject')
            console.log(PROJECT_MANAGER.projects)

            addProject.addEventListener('click', (event) => {
                PROJECT_MANAGER.createProject(getProjectName());
                this.updateSidebar(PROJECT_MANAGER);
            }) 
        },

        updateSidebar(PROJECT_MANAGER){
            const projects = document.querySelector('#projects')
            while (element.firstChild) { 
                element.removeChild(element.firstChild); 
            }
        }
    }
}