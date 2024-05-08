export function todoItem(title, description, dueDate, priority, project){
    return {
        title,
        description,
        dueDate,
        priority,
        project,
        status: false
    }
}