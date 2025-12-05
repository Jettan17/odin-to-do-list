function createItem ({title, 
    description = "", 
    dueDate, 
    priority = "Medium",
    doneStatus = false
}) {
    //Store data in private variable
    let itemData = {
        title,
        description,
        dueDate,
        priority,
        doneStatus
    };

    const readItem = () => ({ ...itemData });

    const updateItem = ({
        title = itemData.title,
        description = itemData.description,
        dueDate = itemData.dueDate,
        priority = itemData.priority,
        doneStatus = itemData.doneStatus
    }) => {
        itemData = {
            title,
            description,
            dueDate,
            priority,
            doneStatus
        }
    }

    return { readItem, updateItem };
}

function createProject ({
    title,
    description = "",
    itemList = []
}) {
    //Store data in private variable
    let projectData = {
        title,
        description,
        itemList
    }

    const readProject = () => ({ ...projectData });

    const updateProject = ({
        title = projectData.title,
        description = projectData.description
    }) => {
        projectData = {
            title,
            description
        }
    }

    const addItem = (newItem) => {
        itemList.push(createItem(newItem));
    }

    return { readProject, updateProject, addItem };
}

const projectManager = (function () {
    let projectList = [];

    const addProject = (newProject) => {
        projectList.push(createProject(newProject));
    }

    //default starting project
    const defaultProject = {
        title: "To-Do List",
    }
    addProject(defaultProject);

    return { projectList, addProject };
})();

export { projectManager }