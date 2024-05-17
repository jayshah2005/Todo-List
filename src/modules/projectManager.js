import { checkListItem } from "./checkListItem";
import { todoItem } from "./todoItem"
import { project } from "./project";

export default function projectManager(){
    const self = {
        projects: [],

        selectedProject: null,

        createProject: (title) => {
            self.projects.push(project(title))
        },

        deleteProject: function () {
            self.projects = self.projects.filter(elem => elem.title !== self.selectedProject.title);
        },

        createTask: (title, description, dueDate, priority, notes, checkList, project, status) => {
            const task = todoItem();
            task.title = title;
            task.description = description;
            task.dueDate = dueDate;
            task.priority = priority;
            task.notes = notes;
            task.checkList = createCheckList(checkList);
            task.project = project;
            task.status = status;

            self.projects
                .find(project => project.title === task.project)
                    .addTask(task);
        },

        createCheckList: (list) => {
            const checkList = [];

            for(item in list){
                checkList.push(checkListItem(item))
            }
            
            return checkList;
        }
    }

    return self
}