import { format } from "date-fns";

function createItem ({title, 
    description = "", 
    dueDate = format(new Date(), "dd-MM-yyyy"), 
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
    })]
}) {
    // normalize itemList into factory instances and store data in private variable
    itemList = (itemList || []).map(it => (typeof it.readItem === 'function' ? it : createItem(it)));
    let projectData = {
        title,
        itemList
    }

    const readProject = () => ({
        title: projectData.title,
        // expose plain item objects (not factory instances)
        itemList: itemList.map(item => (typeof item.readItem === 'function' ? item.readItem() : item))
    });

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

    const updateItem = (index, newData) => {
        if (index >= 0 && index < itemList.length) {
            itemList[index].updateItem(newData);
        }
    }

    return { readProject, addItem, deleteItem, updateItem };
}

const projectManager = (function () {
    let projectList = [];

    const addProject = (newProject) => {
        projectList.push(createProject(newProject));
    }

    const deleteProject = (deleteIndex) => {
        projectList.splice(deleteIndex, 1);
    }

    const save = () => {
        // serialize to plain objects and store
        const plain = projectList.map(p => p.readProject());
        localStorage.setItem("projectList", JSON.stringify(plain));
    }

    const load = () => {
        const raw = localStorage.getItem("projectList");
        if (!raw) return false;
        try {
            const parsed = JSON.parse(raw);
            // mutate existing array so external references remain valid
            projectList.length = 0;
            for (const proj of parsed) {
                // proj is plain { title, itemList: [ {..}, ... ] }
                // convert to factory instance by calling createProject
                // ensure itemList is normalized inside createProject
                projectList.push(createProject({ title: proj.title, itemList: proj.itemList || [] }));
            }
            return true;
        } catch (e) {
            console.error('Failed to parse projectList from localStorage', e);
            return false;
        }
    }

    // initialize: try load, otherwise create default and save
    if (!load()) {
        const defaultProject = { title: "To-Do List" };
        addProject(defaultProject);
    }

    return { projectList, addProject, deleteProject, save, load };
})();

export { projectManager }