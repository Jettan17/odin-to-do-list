import { projectManager } from "./toDoList";
import "./style.css";

const updateProjectsDOM = () => {
    const projectsList = document.getElementById("projects").firstElementChild;

    for (const project of projectManager.projectList) {
        const projectListItem = document.createElement("li");
        const projectTitle = document.createElement("button");
        projectTitle.textContent = project.readProject().title;
        projectListItem.appendChild(projectTitle);
        projectsList.appendChild(projectListItem);
    }

}




document.addEventListener("DOMContentLoaded", () => {
    //Testing, remove when building and deploying
    const defaultProject = projectManager.projectList[0];
    const newItem = {
        title: "Test Task", 
        description: "meowmeow", 
        dueDate: "03-11-2025", 
        priority: "Low"};
    defaultProject.addItem(newItem);
    defaultProject.readProject().itemList[0].updateItem({title: "changed from prev"});
    const newProject = {
        title: "Video Project",
        description: "4201 Final Project",
    }
    projectManager.addProject(newProject);
    
    updateProjectsDOM();
    updateTasksDOM(defaultProject);
})