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
    itemList = []
}) {
    //Store data in private variable
    let projectData = {
        title,
        itemList
    }

    const readProject = () => ({ ...projectData });

    const addItem = (newItem) => {
        itemList.push(createItem(newItem));
    }

    const deleteItem = (deleteIndex) => {
        itemList.splice(deleteIndex, 1);

        //If new length is 0, delete project
        if (itemList.length <= 0) {
            projectManager.deleteProject(projectData);
        }
    }

    return { readProject, addItem, deleteItem };
}

const projectManager = (function () {
    let projectList = [];

    const addProject = (newProject) => {
        projectList.push(createProject(newProject));
    }

    const deleteProject = (deleteProject) => {
        if (projectList.length > 1) {
           //Find delete index
           let deleteIndex = 0;
           for (let i = 0; i < projectList.length; i++) {
                project = projectList[i];
                if (project.title === deleteProject.title) {
                    deleteIndex = i;
                    break;
                }
           } 
            projectList.splice(deleteIndex, 1);
            return true;
        } else {
            return false;
        }
    }

    //default starting project
    const defaultProject = {
        title: "To-Do List",
    }
    addProject(defaultProject);

    return { projectList, addProject, deleteProject };
})();

export { projectManager }