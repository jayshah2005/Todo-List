import './assets/styles/styles.css'
import './assets/styles/forms.css'
import './assets/styles/sidebar.css'
import projectManager from './modules/projectManager'
import DOM from './modules/DOM';

const PROJECT_MANAGER = projectManager();

const page = DOM(PROJECT_MANAGER);

PROJECT_MANAGER.createProject("All");
PROJECT_MANAGER.selectedProject = PROJECT_MANAGER.projects[0];
page.initializeSideBar();