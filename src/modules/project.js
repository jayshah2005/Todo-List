import { todoItem } from "./todoItem";

export function project(title) {
    return {
        title,
        tasks: [],
        status: false,

        createTask: function (title, description, dueDate, priority, project) {
            this.tasks.push(todoItem(title, description, dueDate, priority, project))
        },

        deleteTask: (task) => {
            const index = this.tasks.findIndex(t => t.title === task.title);
            if (index !== -1) {
                this.tasks.splice(index, 1);
            }
        },

        changeStatus: function () {
            this.status = !this.status;
        }
    }
}