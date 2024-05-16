import './assets/styles/styles.css'
import './assets/styles/forms.css'
import './assets/styles/sidebar.css'
import projectManager from './modules/projectManager'
import DOM from './modules/DOM';
import storageAvailable from './modules/storage/storageAvailable'


if (storageAvailable("localStorage")) {

    if(localStorage.getItem("PROJECT_MANAGER")){
        var PROJECT_MANAGER = parse(JSON.parse(localStorage.getItem("PROJECT_MANAGER")));
    } else {
        var PROJECT_MANAGER = projectManager();

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
        
        localStorage.setItem("PROJECT_MANAGER", process(PROJECT_MANAGER))
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
  
function parse(json) {

    for(let key in json){
        try{
            if(json[key].split(" ")[0] === "function"){
                eval(`json.${key} = ${json[key]}`);
            } 
        }catch(error){
            json[key] = parse(json[key])
        }      
    }

    return json
}

