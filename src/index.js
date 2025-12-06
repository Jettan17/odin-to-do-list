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
    defaultProject.readProject().itemList[0].updateItem({title: "changed from prev"});
    console.log(defaultProject.readProject().itemList[0].readItem());
    const newProject = {
        title: "Video Project",
        description: "4201 Final Project",
    }
    projectManager.addProject(newProject);
    console.log(projectManager.projectList.length);
    console.log(projectManager.deleteProject(defaultProject));
    console.log(projectManager.projectList.length);
    console.log(projectManager.projectList[0].readProject());
})