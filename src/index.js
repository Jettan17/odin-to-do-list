import { projectManager } from "./toDoList";

document.addEventListener("DOMContentLoaded", () => {
    //Testing, remove when building and deploying
    const defaultProject = projectManager.projectList[0];
    const newItem = {
        title: "Test Task", 
        description: "meowmeow", 
        dueDate: "03-11-2025", 
        priority: "Low"};
    defaultProject.addItem(newItem);
    console.log(defaultProject.readProject()); 
    console.log(defaultProject.readProject().itemList[0].readItem());
})