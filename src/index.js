import { projectManager } from "./toDoList";

document.addEventListener("DOMContentLoaded", () => {
    const defaultProject = projectManager.projectList[0];
    defaultProject.addItem("Test Task", "meowmeow", "03-11-2025", "Low");
    console.log(projectManager.projectList); //Testing
})