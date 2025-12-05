function createToDoItem (title, description, dueDate, priority) {
    let doneStatus = false;

    return { title, description, dueDate, priority, doneStatus };
}

function createProject (title, description) {
    let itemList = [];

    const addItem = (title, description, dueDate, priority) => {
        const newItem = createToDoItem(title, description, dueDate, priority);
        itemList.push(newItem);
    }

    return { title, description, itemList, addItem };
}

const projectManager = (function () {
    let projectList = [];

    const addProject = (title, description) => {
        const newProject = createProject(title, description);
        projectList.push(newProject);
    }

    //default starting project
    addProject("To-Do List", "");

    return { projectList, addProject };
})();

export { projectManager }