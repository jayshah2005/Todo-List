export function DOM(){
    return{
        initializeSideBar(PROJECT_MANAGER){
            const sidebar = document.querySelector('#sidebar')
            console.log(PROJECT_MANAGER.projects)


            const title = document.createElement('div');
            title.innerHTML = "Projects"
            title.id = 'title'

            sidebar.appendChild(title)

        }
    }
}