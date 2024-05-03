import './assets/styles/styles.css'
import './assets/styles/forms.css'
import projectManager from './modules/projectManager'
import DOM from './modules/DOM';

const PROJECT_MANAGER = projectManager();

const page = DOM();

page.initializeSideBar(PROJECT_MANAGER);


PROJECT_MANAGER.createProject("First project");
page.updateSidebar(PROJECT_MANAGER);