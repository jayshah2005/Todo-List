import { checkListItem } from "./checkListItem";
import { todoItem } from "./todoItem"

export default function projectManager(){
    return{
        projects: [],

        createProject: (title) => {
            this.projects.push(new project(title))
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

            this.projects
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
}