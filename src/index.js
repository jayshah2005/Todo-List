import './assets/styles/styles.css'
import './assets/styles/forms.css'
import projectManager from './modules/projectManager'
import DOM from './modules/DOM';

const PROJECT_MANAGER = projectManager();

const page = DOM();

page.initializeSideBar(PROJECT_MANAGER);
console.log(PROJECT_MANAGER.projects)