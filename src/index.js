import { projectManager } from "./toDoList";
import "./style.css";

const updateProjectsDOM = () => {
    const projectsList = document.getElementById("projects").firstElementChild;

    //Clear Projects DOM
    projectsList.innerHTML = "";

    for (const project of projectManager.projectList) {
        const projectListItem = document.createElement("li");
        const projectTitle = document.createElement("button");
        projectTitle.classList.add("font-en");
        projectTitle.textContent = project.readProject().title;
        console.log(typeof(project));
        projectTitle.addEventListener("click", () => {updateTasksDOM(project);});
        projectListItem.appendChild(projectTitle);
        projectsList.appendChild(projectListItem);
    }

}

const updateTasksDOM = (currentProject) => {
    const tasksContainer = document.getElementById("tasks");

    //Clear tasks DOM
    tasksContainer.innerHTML = "";

    for (const task of currentProject.readProject().itemList) {
        const taskData = task.readItem();
        console.log(taskData.doneStatus);
        const taskItemContainer = document.createElement("div");
        taskItemContainer.classList.add("task-container");
        taskItemContainer.classList.add("font-en");
        const taskTitle = document.createElement("button");
        taskTitle.classList.add("task-title");
        taskTitle.classList.add("font-en");
        taskTitle.textContent = taskData.title;
        const taskDueDate = document.createElement("p");
        taskDueDate.classList.add("task-due-date");
        taskDueDate.classList.add("font-en");
        taskDueDate.textContent = taskData.dueDate;
        const taskPriority = document.createElement("button");
        taskPriority.classList.add("task-priority");
        taskPriority.classList.add("font-en");
        taskPriority.textContent = taskData.priority;
        const taskDoneStatus = document.createElement("input");
        taskDoneStatus.classList.add("task-done-status");
        taskDoneStatus.classList.add("font-en");
        taskDoneStatus.type = "checkbox";
        taskDoneStatus.name = "DoneStatus";
        taskDoneStatus.value = taskData.doneStatus;

        taskItemContainer.appendChild(taskTitle);
        taskItemContainer.appendChild(taskDueDate);
        taskItemContainer.appendChild(taskPriority);
        taskItemContainer.appendChild(taskDoneStatus);
        tasksContainer.appendChild(taskItemContainer);
    }
}

const editTask = (e) => {
    const target = e.target;

    //Open dialog form
}

document.addEventListener("DOMContentLoaded", () => {
    //Testing, remove when building and deploying
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
    
    updateProjectsDOM();
    updateTasksDOM(defaultProject);
})