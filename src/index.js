import { projectManager } from "./toDoList";
import "./style.css";
import { format } from "date-fns";

const updateProjectsDOM = (currentProject) => {
    const projectsList = document.getElementById("projects").firstElementChild;

    //Clear Projects DOM
    projectsList.innerHTML = "";

    const projectIndex = projectManager.projectList.indexOf(currentProject);

    for (let i = 0; i < projectManager.projectList.length; i++) {
        const project = projectManager.projectList[i];
        const projectListItem = document.createElement("li");
        const projectTitle = document.createElement("button");
        projectTitle.classList.add("font-en");
        if (projectIndex === i) {
            projectTitle.classList.add("current-project");
        }
        projectTitle.textContent = project.readProject().title;
        projectTitle.dataset.index = i;
        projectTitle.addEventListener("click", () => {
            updateProjectsDOM(project)
            updateTasksDOM(project);
        });
        projectListItem.appendChild(projectTitle);
        projectsList.appendChild(projectListItem);
    }

}

const updateTasksDOM = (currentProject) => {
    const tasksContainer = document.getElementById("tasks");

    //Clear tasks DOM
    tasksContainer.innerHTML = "";

    const projectIndex = projectManager.projectList.indexOf(currentProject);

    for (let i = 0; i < currentProject.readProject().itemList.length; i++) {
        const task = currentProject.readProject().itemList[i];
        const taskData = task.readItem();
        const taskItemContainer = document.createElement("div");
        taskItemContainer.classList.add("task-container");
        taskItemContainer.classList.add("font-en");
        const taskTitle = document.createElement("button");
        taskTitle.classList.add("task-title");
        taskTitle.classList.add("font-en");
        taskTitle.textContent = taskData.title;
        taskTitle.dataset.index = `${projectIndex},${i}`;
        const taskDueDate = document.createElement("p");
        taskDueDate.classList.add("task-due-date");
        taskDueDate.classList.add("font-en");
        taskDueDate.textContent = taskData.dueDate;
        const taskPriority = document.createElement("button");
        taskPriority.classList.add("task-priority", "font-en");
        const priorityText = (taskData.priority || "").toString().toLowerCase();
        if (priorityText.includes("high")) {
            taskPriority.classList.add("priority-high");
        } else if (priorityText.includes("medium")) {
            taskPriority.classList.add("priority-medium");
        } else {
            taskPriority.classList.add("priority-low");
        }
        taskPriority.textContent = taskData.priority;
        taskPriority.addEventListener("click", () => { //Priority Fast Toggle
            taskPriority.classList = "";
            taskPriority.classList.add("task-priority", "font-en");
            

            const currentVal = taskPriority.textContent;
            if (currentVal === "Low") {
                taskPriority.textContent = "Medium";
                taskPriority.classList.add("priority-medium");
            } else if (currentVal === "Medium") {
                taskPriority.textContent = "High";
                taskPriority.classList.add("priority-high");
            } else if (currentVal === "High") {
                taskPriority.textContent = "Low";
                taskPriority.classList.add("priority-low");
            }

            const taskIndex = i;
            projectManager.projectList[projectIndex].readProject().itemList[taskIndex].updateItem({priority: taskPriority.textContent});
        })
        const taskDoneStatus = document.createElement("input");
        taskDoneStatus.classList.add("task-done-status");
        taskDoneStatus.classList.add("font-en");
        taskDoneStatus.type = "checkbox";
        taskDoneStatus.name = "DoneStatus";
        taskDoneStatus.checked = taskData.doneStatus;
        taskDoneStatus.addEventListener("click", () => {
            const taskIndex = i;
            projectManager.projectList[projectIndex].readProject().itemList[taskIndex].updateItem({doneStatus: taskDoneStatus.value});
        })

        taskItemContainer.appendChild(taskTitle);
        taskItemContainer.appendChild(taskDueDate);
        taskItemContainer.appendChild(taskPriority);
        taskItemContainer.appendChild(taskDoneStatus);
        tasksContainer.appendChild(taskItemContainer);
    }

    //Editing Task
    for (const taskTitle of document.getElementsByClassName("task-title")) {
        taskTitle.addEventListener("click", () => {
            const deleteButton = document.getElementById("edit-delete");
            deleteButton.className = "";
            deleteButton.classList.add("font-en");
            const projectIndex = taskTitle.dataset.index.split(",")[0];
            const taskIndex = taskTitle.dataset.index.split(",")[1];
            const taskData = projectManager.projectList[projectIndex].readProject().itemList[taskIndex].readItem();
            document.getElementById("edit-title").value = taskData.title;
            document.getElementById("edit-description").value = taskData.description;
            document.getElementById("edit-deadline").value = taskData.dueDate;
            document.getElementById("edit-priority").textContent = taskData.priority;
            document.getElementById("edit-confirm").dataset.index = taskTitle.dataset.index;
            const editForm = document.getElementById("edit-task-form");
            editForm.removeAttribute("hidden");
            editForm.showModal();
        })
    }
}

document.addEventListener("DOMContentLoaded", () => {
    //Testing, modify when building and deploying
    const defaultProject = projectManager.projectList[0];
    let newItem = {
        title: "Test Task", 
        description: "meowmeow", 
        dueDate: "03-11-2025", 
        priority: "Low"};
    defaultProject.addItem(newItem);
    defaultProject.readProject().itemList[0].updateItem({title: "changed from prev"});
    const newProject = {
        title: "Video Project"
    }
    projectManager.addProject(newProject);
    newItem = {
        title: "VFX", 
        description: "28:00 and 45:14", 
        dueDate: "01-03-2026"};
    projectManager.projectList[1].addItem(newItem);

    updateProjectsDOM(defaultProject);
    updateTasksDOM(defaultProject);

    document.getElementById("close-task").addEventListener("click", () => {
        document.getElementById("edit-task-form").close();
    })

    document.getElementById("cancel-project").addEventListener("click", () => {
        document.getElementById("new-project-form").close();
    })

    document.getElementById("edit-confirm").addEventListener("click", (e) => {
        const updatedItem = {
            title: document.getElementById("edit-title").value,
            description: document.getElementById("edit-description").value,
            dueDate: document.getElementById("edit-deadline").value,
            priority: document.getElementById("edit-priority").textContent
        }

        const projectIndex = e.target.dataset.index.split(",")[0];
        const taskIndex = e.target.dataset.index.split(",")[1];

        //check whether edit or add
        if (document.getElementById("edit-delete").classList.contains("disabled")) {
            //Add
            projectManager.projectList[projectIndex].addItem(updatedItem);
        } else {
            //Edit
            projectManager.projectList[projectIndex].readProject().itemList[taskIndex].updateItem(updatedItem);
        }

        document.getElementById("edit-task-form").close();
        updateTasksDOM(projectManager.projectList[projectIndex]);
    })

    document.getElementById("confirm-project").addEventListener("click", () => {
        projectManager.addProject({title: document.getElementById("new-project-title").value});
        document.getElementById("new-project-form").close();
        updateProjectsDOM(projectManager.projectList.at(-1));
    })
    
    document.getElementById("edit-priority").addEventListener("click", (e) => {
        const currentVal = e.target.textContent;
        
        if (currentVal === "Low") {
            e.target.textContent = "Medium";
        } else if (currentVal === "Medium") {
            e.target.textContent = "High";
        } else if (currentVal === "High") {
            e.target.textContent = "Low";
        }
    })

    document.getElementById("add-task-button").addEventListener("click", () => {
        const deleteButton = document.getElementById("edit-delete");
        deleteButton.className = "";
        deleteButton.classList.add("font-en", "disabled");
        document.getElementById("edit-title").value = "";
        document.getElementById("edit-description").value = "";
        document.getElementById("edit-deadline").value = format(new Date(), "dd-MM-yyyy");
        document.getElementById("edit-priority").textContent = "Medium";
        const currentProjectIndex = document.getElementById("tasks").firstElementChild.firstElementChild.dataset.index.split(',')[0];
        document.getElementById("edit-confirm").dataset.index = `${currentProjectIndex},${projectManager.projectList[currentProjectIndex].length}`;
        const editForm = document.getElementById("edit-task-form");
        editForm.removeAttribute("hidden");
        editForm.showModal();
    })

    document.getElementById("new-project-button").addEventListener("click", () => {
        document.getElementById("new-project-form").showModal();
    })

    document.getElementById("edit-delete").addEventListener("click", () => {
        if (document.getElementById("edit-delete").classList.contains("disabled")) {
            return;
        }
        const projectIndex = document.getElementById("edit-confirm").dataset.index.split(",")[0];
        const taskIndex = document.getElementById("edit-confirm").dataset.index.split(",")[1];

        projectManager.projectList[projectIndex].deleteItem(projectIndex, taskIndex);

        document.getElementById("edit-task-form").close();
        updateProjectsDOM(projectManager.projectList[0]);
        updateTasksDOM(projectManager.projectList[0]);
    })
})