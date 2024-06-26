import todoItem from "./todoItem"
import project from "./project";

export default function projectManager(){
    const self = {
        projects: [],

        selectedProject: null,

        createProject: function (title) {
            this.projects.push(project(title))
        },

        deleteProject: function () {
            this.projects = this.projects.filter(elem => elem.title !== this.selectedProject.title);
        },

        createTask: function (title, description, dueDate, priority, notes, checkList, project, status) {
            const task = todoItem();
            task.title = title;
            task.description = description;
            task.dueDate = dueDate;
            task.priority = priority;
            task.notes = notes;
            task.checkList = createCheckList(checkList);
            task.project = project;
            task.status = status;

            this.projects
                .find(project => project.title === task.project)
                    .addTask(task);
        },

        createCheckList: function (list) {
            const checkList = [];

            for(item in list){
                checkList.push(checkListItem(item))
            }
            
            return checkList;
        }
    }

    return self;
}