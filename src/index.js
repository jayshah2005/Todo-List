import './assets/styles/styles.css'
import './assets/styles/forms.css'
import './assets/styles/sidebar.css'
import projectManager from './modules/projectManager'
import DOM from './modules/DOM';

const PROJECT_MANAGER = projectManager();

const page = DOM(PROJECT_MANAGER);

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
page.reloadTasks()


page.initialize();