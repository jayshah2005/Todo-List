export function project(title) {
    return {
        title,
        tasks: [],
        status: false,
        addTast: (task) => {
            this.tasks.push(task)
        },
        deleteTask: (task) => {
            const index = this.tasks.findIndex(t => t.title === task.title);
            if (index !== -1) {
                this.tasks.splice(index, 1);
            }
        }
    }
}