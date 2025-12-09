import { format } from "date-fns";

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
    itemList = [createItem({
        title: "New Task",
        dueDate: format(new Date(), "dd-MM-yyyy")
    })]
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

    const deleteItem = (projectIndex, deleteIndex) => {
        const projectList = projectManager.projectList;
        if (projectList.length > 1 || itemList.length > 1) {
           itemList.splice(deleteIndex, 1);

            //If new length is 0, delete project
            if (itemList.length <= 0) {
                projectManager.deleteProject(projectIndex);
            }
        }
    }

    return { readProject, addItem, deleteItem };
}

const projectManager = (function () {
    let projectList = [];

    const addProject = (newProject) => {
        projectList.push(createProject(newProject));
    }

    const deleteProject = (deleteIndex) => {
        projectList.splice(deleteIndex, 1);
    }

    //default starting project
    const defaultProject = {
        title: "To-Do List",
    }
    addProject(defaultProject);

    return { projectList, addProject, deleteProject };
})();

export { projectManager }