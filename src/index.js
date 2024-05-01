import './styles.css'
import projectManager from './modules/projectManager'
import { DOM } from './modules/DOM';

const PROJECT_MANAGER = projectManager();

DOM(PROJECT_MANAGER);