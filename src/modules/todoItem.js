export function todoItem(title, description, dueDate, priority, project){
    return {
        title,
        description,
        dueDate,
        priority,
        project,
        status: false,
        changeStatus: function () {
            this.status = !this.status;
        },
        editTask: function (title, description, dueDate, priority, project) {
            this.title = title,
            this.description = description,
            this.dueDate = dueDate,
            this.priority = priority,
            this.project = project
        }
    }
}